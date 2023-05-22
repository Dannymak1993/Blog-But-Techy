const commentForm = document.querySelector('#comment-form');
const commentTextInput = document.querySelector('#comment-text');
const blogId = window.location.pathname.split('/').pop(); // Get the last part of the URL as the blogId

commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const blog = document.querySelector(".button")
    const blog_id = blog.getAttribute("id")
    const commentText = commentTextInput.value;

    try {
        // Make the POST request to create the comment
        const response = await fetch(`/api/comments/${blog_id}`, {
            method: 'POST',
            body: JSON.stringify({ commentText }),
            headers: { 'Content-Type': 'application/json' },
        });

        // Handle the response as needed
        console.log(response);
        if (response.ok) {
            window.location.reload()
        }
    } catch (error) {
        // Handle errors
        console.error(error);
    }

});


document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler);
