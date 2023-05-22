const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/:blogId', async (req, res) => {
    try {
        const { commentText } = req.body;
        const { blogId } = req.params; // Access the blogId from the route parameters

        // Create a new comment in the database
        const newComment = await Comment.create({
            commentText,
            blog_id: blogId,
            user_id: req.session.user_id, // Associate the comment with the blog using the blogId
        });

        // Optionally, you can return the newly created comment as the response
        res.status(200).json(newComment);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router;
