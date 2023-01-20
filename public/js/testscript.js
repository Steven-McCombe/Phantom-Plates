router.get('/dashboard', async (req, res) => {
    try {
        const dbAddress = await Address.findOne({
            where: {
                user_id: req.session.user_id
            },
        })
        const dbKitchen = await Kitchen.findOne({
            where: {
                user_id: req.session.user_id
            },
        })
        let dbUser = null
        if (dbKitchen) {
            dbUser = await User.findAll({
                where: {
                    id: req.session.user_id,
                },
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    {
                        model: Kitchen,
                        where: {
                            user_id: req.session.user_id
                        },
                        include: {
                            model: Food
                        }
                    },
                ],
            });
        } else {
            dbUser = await User.findAll({
                where: {
                    id: req.session.user_id,
                },
                attributes: {
                    exclude: ['password'],
                },
            });
        }
        if (!dbUser) {
            res.redirect('/');
        }
        const users = dbUser.map((user) => user.get({ plain: true }));
        const addresses = { ...dbAddress }
        console.log("this is addresses" + addresses)
        console.log("this is users " + users)
        res.render('dashboard', {
            users,
            addresses,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});