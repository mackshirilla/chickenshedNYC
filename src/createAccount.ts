import { validateEmail, validateFirstName, validateLastName } from './utils/forms/inputValidation';
import { createAccount } from './utils/requests/auth/createAccountRequest';

const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
const isStudent = document.getElementById('isStudent') as HTMLInputElement;

//if isStudent is checked, change .toggle-text text to 'Yes'
isStudent.addEventListener('change', () => {
  //get .toggle-text element by class
  const toggleText = document.getElementsByClassName('toggle-text')[0] as HTMLSpanElement;
  if (isStudent.checked) {
    toggleText.textContent = 'Yes';
  } else {
    toggleText.textContent = 'No';
  }
});

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
