// Import email and password validation functions
import { validateEmail, validatePassword } from './utils/forms/inputValidation';
// Import login function
import { loginWithPassword } from './utils/requests/auth/loginRequestWithPassword';

const submitButton = document.getElementById('submitButton') as HTMLButtonElement;

submitButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default form submission

  // Validate email and password
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (!isEmailValid || !isPasswordValid) {
    // Display error message if validation fails
    const submitError = document.getElementById('submitError') as HTMLDivElement;
    submitError.style.display = 'block';
    submitError.textContent = 'Please make sure you have entered all fields correctly.';
  } else {
    // If both validations pass, attempt to log in
    loginWithPassword();
  }
});
