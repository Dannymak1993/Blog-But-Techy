const commentForm = document.querySelector('#comment-form');
const commentTextInput = document.querySelector('#comment-text');
const blogId = window.location.pathname.split('/').pop(); // Get the last part of the URL as the blogId

commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const commentText = commentTextInput.value;

    try {
        // Make the POST request to create the comment
        const response = await axios.post(`/api/blogs/${blogId}/comments`, {
            commentText,
        });

        // Handle the response as needed
        console.log(response.data);
    } catch (error) {
        // Handle errors
        console.error(error);
    }
});


document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
