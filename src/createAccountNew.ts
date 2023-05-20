import { validateEmail, validateFirstName, validateLastName } from './utils/inputValidation';
import { createAccount } from './utils/requests/createAccountRequest';

const submitButton = document.getElementById('submitButton') as HTMLButtonElement;

submitButton.addEventListener('click', (e) => {
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
