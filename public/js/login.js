// FUNCTION TO HANDLE LOGIN REQUESTS
const loginFormHandler = async function(event) {
  event.preventDefault();
  
  const usernameEl = document.querySelector('#username-input-login');
  const passwordEl = document.querySelector('#password-input-login');
  const notify = document.querySelector('#notify');
  
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      notify.classList.remove('hidden')
    }
  };
  // EVENT LISTENER FOR A SUBMIT BUTTON ON A FORM
  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
  