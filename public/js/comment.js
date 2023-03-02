const commentFormHandler = async (event) => {
    event.preventDefault();
  //alert("commentFormHandler");
    // Collect values from the login form
    //const email = document.querySelector('#email-login').value.trim();
    const contents = document.querySelector('#comment').value.trim();
    const blog_id = document.querySelector('#blog-id').value.trim();
    console.log(contents);
    if (contents) {
      // Send a POST request to the API endpoint
      console.log("posting comment");

      console.log(JSON.stringify({ contents, blog_id
        /*"user_id": "1",*/
        /* "blog_id": "3"*/
      }),
         )

      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ contents, blog_id}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the home page
        //document.location.replace('/api/blogs/3');
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.new-comment')
  .addEventListener('submit', commentFormHandler);
  