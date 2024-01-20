import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
} from './utils/forms/inputValidation';
// import {createAccountWithPassword} from './utils/requests/auth/createAccountRequestWithPassword';
import { createAccountWithPassword } from './utils/requests/auth/createAccountRequestWithPassword';

// eslint-disable-next-line prettier/prettier
const submitAccountButton = document.getElementById('submitAccountButton') as HTMLButtonElement;

submitAccountButton.addEventListener('click', (e) => {
  if (!validateFirstName() || !validateLastName() || !validateEmail() || !validatePassword()) {
    e.preventDefault();
    //display error message
    const submitError = document.getElementById('submitError') as HTMLDivElement;
    submitError.style.display = 'block';
    submitError.textContent = 'Please make sure you have entered all fields correctly.';
  } else {
    e.preventDefault();
    // submit form
    createAccountWithPassword();
  }
});
