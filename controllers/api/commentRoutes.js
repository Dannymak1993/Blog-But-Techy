const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        // Extract the comment data from the request body
        const { commentText, blogId } = req.body;

        // Create a new comment in the database
        const newComment = await Comment.create({
            comment_text: commentText,
            blog_id: blogId,
            // Add any other necessary fields
        });

        // Optionally, you can return the newly created comment as the response
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;