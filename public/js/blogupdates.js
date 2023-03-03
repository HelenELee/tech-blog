const updateHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the update form
    const title = document.querySelector('#blog-title').value.trim();
    const contents = document.querySelector('#blog-contents').value.trim();
    //hidden field on form
    const blog_id = document.querySelector('#blog-id').value.trim();
    
    
    if (title && contents) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/blogs/${blog_id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, contents, "user_id":"4" }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  const deleteHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the update form
    const blog_id = document.querySelector('#blog-id').value.trim();
  
    
    // Send a DELETE request to the API endpoint
    const response = await fetch(`/api/blogs/${blog_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        // If successful, redirect the browser to the dashbard page
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
    
  };

//connect events to buttons
  document
  .querySelector('#update-blog')
  .addEventListener('click', updateHandler);

  document
  .querySelector('#delete-blog')
  .addEventListener('click', deleteHandler);