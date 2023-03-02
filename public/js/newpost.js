const postFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const title = document.querySelector('#blog-title').value.trim();
    const contents = document.querySelector('#blog-contents').value.trim();
    //alert(req.session.user_id);
    if (title && contents) {
      // Send a POST request to the API endpoint
      //TO DO Get actual user_id
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({ title, contents}),
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

  document
  .querySelector('#post-blog')
  .addEventListener('click', postFormHandler);