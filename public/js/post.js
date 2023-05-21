const postFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the post form
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the dashboard or the newly created blog page
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.form')
    .addEventListener('submit', postFormHandler);
