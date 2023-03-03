//handle login
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = document.querySelector('#name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (name && password) {
    // Send a POST request to the API endpoint - check user exists
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  } else {
    //if no values entered in form, inform user - validation
    //dialog hidden on login.handlebars
    document.querySelector('#dialog').classList.remove("hidden");
   
   $( function() {
     $( "#dialog" ).dialog();
   } );
  }
};


//redirect user to sign up
const signupGetFormHandler = async (event) => {
  event.preventDefault();
  
  document.location.replace('/signup');
    
};

//add listeners to buttons
if(document.querySelector('.login-form')) {
  document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
}

if (document.querySelector('#sign-up')) {
  document
  .querySelector('#sign-up')
  .addEventListener('click', signupGetFormHandler);
}

