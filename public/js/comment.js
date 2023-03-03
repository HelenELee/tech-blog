//called when new comment is submitted
const commentFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the comment form
    
    const contents = document.querySelector('#comment').value.trim();
    const blog_id = document.querySelector('#blog-id').value.trim();
    
    if (contents) {
      // Send a POST request to the API endpoint to create comment

      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ contents, blog_id}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    } else {
      //if nothing entered in form inform user - validation
      document.querySelector('#dialog').classList.remove("hidden");
       $( function() {
             $( "#dialog" ).dialog();
       } );
    }
  };

  //added listener to button
  document
  .querySelector('.new-comment')
  .addEventListener('submit', commentFormHandler);
  