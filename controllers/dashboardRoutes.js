const router = require('express').Router();
const { Blog } = require('../models');
const withAuth = require('../utils/auth');
const checkUserInactivity = (req, res, next) => {
    const inactivityDuration = 60 * 60 * 1000;

    if (req.session.lastActivity && Date.now() - req.session.lastActivity > inactivityDuration) {

        req.session.destroy();
        return res.redirect('/login');
    }

    next();
};

// Dashboard homepage
router.get('/', withAuth, async (req, res) => {
    console.log("test1");
    try {
        console.log(req.session,"req.session");
        console.log("test2");
        req.session.lastActivity = Date.now();
        // Retrieve blogs created by the logged-in user
        const blogData = await Blog.findAll({
            where: { user_id: req.session.user_id },
        });
        console.log("test3");
        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        console.log(blogs);

        res.render('dashboard', { blogs, loggedIn: req.session.loggedIn, });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Edit blog page
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        req.session.lastActivity = Date.now();
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

        res.render('editblog', { blog, loggedIn: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add new blog page
router.get('/newblog', withAuth, (req, res) => {
    req.session.lastActivity = Date.now();
    res.render('newblog', { loggedIn: true });
});


module.exports = router;
