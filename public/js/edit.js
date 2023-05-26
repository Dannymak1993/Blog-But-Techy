const editFormHandler = async (event) => {
    event.preventDefault();

    const button = event.target;
    const blogId = button.getAttribute("id");

    // Collect values from the edit form fields
    const updatedTitle = document.querySelector('#blog-title').value;
    const updatedContent = document.querySelector('#post-content').value;

    try {
        const response = await fetch(`/api/blog/${blogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: updatedTitle, 
                description: updatedContent
            }),
        });

        if (response.ok) {
            // If successful, redirect the browser to the edited blog post page or the dashboard
            document.location.replace(`/blog/${blogId}`);
        } else {
            // Handle errors if the update request fails
            alert(response.statusText);
        }
    } catch (err) {
        // Handle any network errors or exceptions
        console.error(err);
        alert('An error occurred during the update.');
    }
};

document.querySelectorAll('.edit-button').forEach((button) => {
    button.addEventListener('click', editFormHandler);
});
