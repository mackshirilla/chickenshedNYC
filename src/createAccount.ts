import { validateEmail, validateFirstName, validateLastName } from './utils/forms/inputValidation';
import { createAccount } from './utils/requests/auth/createAccountRequest';

const submitAccountButton = document.getElementById('submitAccountButton') as HTMLButtonElement;

submitAccountButton.addEventListener('click', (e) => {
  if (!validateFirstName() || !validateLastName() || !validateEmail()) {
    e.preventDefault();
    //display error message
    const submitError = document.getElementById('submitError') as HTMLDivElement;
    submitError.style.display = 'block';
    submitError.textContent = 'Please make sure you have entered all fields correctly.';
  } else {
    e.preventDefault();
    // submit form
    createAccount();
  }
});
