// FUNCTION TO HANDLE SIGNUP REQUEST
const signupFormHandler = async function(event) {
    event.preventDefault();
  
    const usernameEl = document.querySelector('#username-input-signup');
    const passwordEl = document.querySelector('#password-input-signup');
    const notify = document.querySelector('#notify');
  // CHECK IF THERE IS A USERNAME AND PASSWORD
    if (usernameEl && passwordEl) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      notify.classList.remove('hidden')
    }
  }
};
  // EVENT LISTENER FOR SUBMIT BUTTON PRESS ON FORM SUBMISSION
  document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);