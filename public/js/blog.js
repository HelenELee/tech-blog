const newpostFormHandler = async (event) => {
    event.preventDefault();
    // If successful, redirect the browser to the new post page
    document.location.replace('/newblog');
      
  };

  document
  .querySelector('#new-post')
  .addEventListener('click', newpostFormHandler);