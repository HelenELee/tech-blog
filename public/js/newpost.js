//handle creating new blog post
const postFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the blog form
    const title = document.querySelector('#blog-title').value.trim();
    const contents = document.querySelector('#blog-contents').value.trim();
    //check data entered in form
    if (title && contents) {
      // Send a POST request to the API endpoint
      
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
    } else {
      //no data entered in form, tell user - validation
      document.querySelector('#dialog').classList.remove("hidden");
        
        $( function() {
          $( "#dialog" ).dialog();
        } );
    }
  };

  //add event listeners
  document
  .querySelector('#post-blog')
  .addEventListener('click', postFormHandler);