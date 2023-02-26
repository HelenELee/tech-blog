const commentFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    //const email = document.querySelector('#email-login').value.trim();
    const comment = document.querySelector('#comment').value.trim();
    console.log(comment);
    if (comment) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment, 
                user_id: 1,
                blog_id: 1}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.new-comment')
  .addEventListener('submit', commentFormHandler);
  