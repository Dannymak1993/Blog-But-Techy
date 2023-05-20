const router = require('express').Router();
const { Blog } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard homepage
router.get('/', withAuth, async (req, res) => {
    try {
        // Retrieve blogs created by the logged-in user
        const blogData = await Blog.findAll({
            where: { user_id: req.session.user_id },
        });

        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('dashboard', { blogs, logged_in: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Edit blog page
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        // Find the blog with the given ID
        const blogData = await Blog.findByPk(req.params.id);

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        // Check if the logged-in user is the creator of the blog
        if (blogData.user_id !== req.session.user_id) {
            res.status(403).json({ message: 'Access denied. You are not the creator of this blog!' });
            return;
        }

        // Serialize data so the template can read it
        const blog = blogData.get({ plain: true });

        res.render('edit-blog', { blog, logged_in: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add new blog page
router.get('/new', withAuth, (req, res) => {
    res.render('new-blog', { logged_in: true });
});

module.exports = router;