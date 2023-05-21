const commentFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the comment form
    const commentText = document.querySelector('#comment-text').value.trim();
    const blogId = document.querySelector('#blog-id').value;

    if (commentText) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ commentText, blogId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, reload the page to display the new comment
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
