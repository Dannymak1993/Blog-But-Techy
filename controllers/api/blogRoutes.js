const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const checkUserInactivity = (req, res, next) => {
    const inactivityDuration = 60 * 60 * 1000; 

    if (req.session.lastActivity && Date.now() - req.session.lastActivity > inactivityDuration) {
     
        req.session.destroy();
        return res.redirect('/login'); 
    }

    next();
};


router.post('/', withAuth, async (req, res) => {
    try {
        req.session.lastActivity = Date.now();
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                { model: User },
                { model: Comment, include: [{ model: User }] }
            ]
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id' });
            return;
        }

        const blog = blogData.get({ plain: true });
        res.render('blog-details', { blog }); // Render the 'blog-details' view with the blog data
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        req.session.lastActivity = Date.now();
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
