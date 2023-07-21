// authenticate user on page load
import { authenticate } from './utils/requests/auth/authenticateUser';
authenticate();
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
  validateAdditionalEmail,
  validateDismissal,
  validateDOB,
  validateEmail,
  validateEmergency,
  validateEthnicity,
  validateFirstName,
  validateGender,
  validateGrade,
  validateHealth,
  validateLastName,
  validatePhone,
  validateSchool,
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

const genderInput = document.getElementById('genderInput');
if (genderInput) genderInput.addEventListener('input', validateGender);

const schoolInput = document.getElementById('schoolInput');
if (schoolInput) schoolInput.addEventListener('input', validateSchool);

const gradeInput = document.getElementById('gradeInput');
if (gradeInput) gradeInput.addEventListener('input', validateGrade);

const ethnicityInput = document.getElementById('ethnicityInput');
if (ethnicityInput) ethnicityInput.addEventListener('input', validateEthnicity);

const healthInput = document.getElementById('healthInput');
if (healthInput) healthInput.addEventListener('input', validateHealth);

const emergencyInput = document.getElementById('emergencyContact');
if (emergencyInput) emergencyInput.addEventListener('input', validateEmergency);

const dismissal = document.getElementById('dismissal');
if (dismissal) dismissal.addEventListener('input', validateDismissal);

const additionalEmail = document.getElementById('additionalEmail');
if (additionalEmail) additionalEmail.addEventListener('input', validateAdditionalEmail);

// Get all toggle switches
const toggleSwitches = document.querySelectorAll<HTMLInputElement>(
  '.switch input[type="checkbox"]'
);

// Add click event listener to each toggle switch
toggleSwitches.forEach(function (switchInput) {
  switchInput.addEventListener('click', function () {
    // Toggle the 'checked' class on the parent slider element
    const parentNode = this.parentNode as HTMLElement;
    parentNode.classList.toggle('checked');

    // Get the toggle text element
    const toggleText = parentNode.querySelector('.toggle-text') as HTMLElement | null;

    // Check if the toggle text element exists
    if (toggleText) {
      // Update the toggle text based on the toggle switch state
      if (this.checked) {
        toggleText.textContent = 'Yes';
      } else {
        toggleText.textContent = 'No';
      }
    }
  });
});

// if additionalCare is checked set #additionalOverflow to 20rem height
const additionalCare = document.getElementById('additionalCare') as HTMLInputElement;
const additionalOverflow = document.getElementById('additionalOverflow') as HTMLDivElement;
additionalCare.addEventListener('click', () => {
  if (additionalCare.checked) {
    additionalOverflow.style.height = '32rem';
  } else {
    additionalOverflow.style.height = '0';
  }
});

//if familyToggle is checked set #familyOverflow to 12rem height
const familyToggle = document.getElementById('familyToggle') as HTMLInputElement;
const familyOverflow = document.getElementById('familyOverflow') as HTMLDivElement;
familyToggle.addEventListener('click', () => {
  if (familyToggle.checked) {
    familyOverflow.style.height = '12rem';
  } else {
    familyOverflow.style.height = '0';
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
    !validateDOB() ||
    !validateGender() ||
    !validateSchool() ||
    !validateGrade() ||
    !validateEthnicity() ||
    !validateHealth() ||
    !validateEmergency() ||
    !validateDismissal() ||
    !validateAdditionalEmail
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
