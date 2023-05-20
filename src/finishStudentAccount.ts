// authenticate user on page load
import { authenticate } from './utils/requests/authenticateUser';
authenticate();
console.log('authenticated');

//import getStudentProfile function
import { getStudentProfile } from './utils/requests/studentRequests';
//on page load get student profile
getStudentProfile();
console.log(getStudentProfile());

// Import and use the addFileUploadListener function from utils/imageUpload.ts
import { uploadStudentImage } from './utils/imageUpload';
const imageUploadInput = document.getElementById('imageUpload') as HTMLInputElement;
uploadStudentImage(imageUploadInput);

// Import inputValidation functions
import { validateDOB, validatePhone } from './utils/inputValidation';

// Use event listeners to call all the inputValidation functions when a user interacts with an input element.
const phoneInput = document.getElementById('phoneInput');
if (phoneInput) phoneInput.addEventListener('input', validatePhone);

const dobInput = document.getElementById('dobInput');
if (dobInput) dobInput.addEventListener('input', validateDOB);

//import updateStudentProfile function
import { updateStudentProfile } from './utils/requests/studentRequests';

// prevent form submit button from submitting form if any input is invalid
const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
submitButton.addEventListener('click', (e) => {
  if (!validatePhone() || !validateDOB()) {
    e.preventDefault();
    //display error message
    const submitError = document.getElementById('submitError') as HTMLDivElement;
    submitError.style.display = 'block';
    submitError.textContent = 'Please make sure you have entered all fields correctly.';
  } else {
    e.preventDefault();
    updateStudentProfile();
  }
});
