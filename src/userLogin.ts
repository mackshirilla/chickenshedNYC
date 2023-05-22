//import email validation function from utils/forms/inputValidation.ts
import { validateEmail } from './utils/forms/inputValidation';
//import login function
import { login } from './utils/requests/auth/loginRequest';

const submitButton = document.getElementById('submitButton') as HTMLButtonElement;

submitButton.addEventListener('click', (e) => {
  if (!validateEmail()) {
    e.preventDefault();
    //display error message
    const submitError = document.getElementById('submitError') as HTMLDivElement;
    submitError.style.display = 'block';
    submitError.textContent = 'Please make sure you have entered all fields correctly.';
  } else {
    e.preventDefault();
    // submit form
    login();
  }
});
