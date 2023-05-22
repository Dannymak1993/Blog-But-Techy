
const deleteFormHandler = async (event) => {
    
    const blog = document.querySelector(".button")
    
    const blog_id = blog.getAttribute("id")
   
    // Collect values from the post form
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/blog/${blog_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the dashboard or the newly created blog page
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

document
    .querySelector('.button')
    .addEventListener('click', deleteFormHandler);
