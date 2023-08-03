// authenticate user on page load
import { authenticate } from './utils/requests/auth/authenticateUser';
authenticate();
console.log('authenticated');

// Import addStudentOnLoad and getStudentProfiles function
import { addStudentOnLoad, getStudentProfiles } from './utils/requests/studentRequests';

//on page load look for student profiles
getStudentProfiles();

// On page load add student record to student_profiles table
addStudentOnLoad();

// Import and use the addFileUploadListener function from utils/imageUpload.ts
import { uploadStudentImage } from './utils/forms/imageUpload';
const imageUploadInput = document.getElementById('imageUpload') as HTMLInputElement;
uploadStudentImage(imageUploadInput);

// Import inputValidation functions
import {
  validateDOB,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhone,
} from './utils/forms/inputValidation';

// Use event listeners to call all the inputValidation functions when a user interacts with an input element.
const firstNameInput = document.getElementById('firstNameInput');
if (firstNameInput) firstNameInput.addEventListener('input', validateFirstName);

const lastNameInput = document.getElementById('lastNameInput');
if (lastNameInput) lastNameInput.addEventListener('input', validateLastName);

const emailInput = document.getElementById('emailInput');
if (emailInput) emailInput.addEventListener('input', validateEmail);

const phoneInput = document.getElementById('phoneInput');
if (phoneInput) phoneInput.addEventListener('input', validatePhone);

const dobInput = document.getElementById('dobInput');
if (dobInput) dobInput.addEventListener('input', validateDOB);

//change sendTexts toggle text to 'Yes' or 'No' depending on if it is checked
const sendTexts = document.getElementById('sendTexts') as HTMLInputElement;
sendTexts.addEventListener('change', () => {
  //get .toggle-text element by class
  const toggleText = document.getElementsByClassName('toggle-text')[0] as HTMLSpanElement;
  if (sendTexts.checked) {
    toggleText.textContent = 'Yes';
  } else {
    toggleText.textContent = 'No';
  }
});

//import updateStudentProfile function
import { updateStudentProfile } from './utils/requests/studentRequests';

// prevent form submit button from submitting form if any input is invalid
const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
submitButton.addEventListener('click', (e) => {
  if (
    !validateFirstName() ||
    !validateLastName() ||
    !validateEmail() ||
    !validatePhone() ||
    !validateDOB()
  ) {
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
