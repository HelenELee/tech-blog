const updateHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const title = document.querySelector('#blog-title').value.trim();
    const contents = document.querySelector('#blog-contents').value.trim();
    const blog_id = document.querySelector('#blog-id').value.trim();
    //alert(title + "/" + contents + "/" + blog_id);
    
    if (title && contents) {
      // Send a POST request to the API endpoint
      //TO DO Get actual user_id
      const response = await fetch(`/api/blogs/${blog_id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, contents, "user_id":"4" }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  const deleteHandler = async (event) => {
    event.preventDefault();
  alert("DELETE!!")
    // Collect values from the login form
    const blog_id = document.querySelector('#blog-id').value.trim();
  
    
    // Send a POST request to the API endpoint
    //TO DO Get actual user_id
    const response = await fetch(`/api/blogs/${blog_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
    
  };


  document
  .querySelector('#update-blog')
  .addEventListener('click', updateHandler);

  document
  .querySelector('#delete-blog')
  .addEventListener('click', deleteHandler);