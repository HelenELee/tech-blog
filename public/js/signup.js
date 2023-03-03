//Handle sign up of user
const signupFormHandler = async (event) => {
  event.preventDefault();
  //get details from form
  const name = document.querySelector('#name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  //check details were added
  //post to endpoint and create new user
  if (name && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
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

const signupGetFormHandler = async (event) => {
  event.preventDefault();
  document.location.replace('/signup');
    
};

//add event listeners

if(document.querySelector('.signup-form')) {
    document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
}

if (document.querySelector('#sign-up')) {
  document
  .querySelector('#sign-up')
  .addEventListener('click', signupGetFormHandler);
}

