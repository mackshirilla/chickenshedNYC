// import authenticate from './authenticate';
import { authenticate } from './utils/requests/auth/authenticateUser';

// authenticate on page load
authenticate();

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

  // Trigger the click event to update the toggle text and #displayYInput initially
  switchInput.click();
});

// import getGuardianProfile()
import { getGuardianProfile } from './utils/requests/guardianRequests';

// get guardian profile on page load
getGuardianProfile()
  .then(() => {
    // Log the response data

    // Get the #yMember toggle switch
    const yMemberToggle = document.querySelector<HTMLInputElement>('#yMember');

    // Check if the #yMember toggle switch has the 'checked' attribute
    if (yMemberToggle?.checked) {
      setDisplayYInputHeight('7rem');
    } else {
      setDisplayYInputHeight('0rem');
    }

    // Add event listener to #yMember toggle switch
    yMemberToggle?.addEventListener('change', function () {
      // Check if the #yMember toggle switch is checked
      if (this.checked) {
        setDisplayYInputHeight('7rem');
      } else {
        setDisplayYInputHeight('0rem');
      }
    });
  })
  .catch((error) => {
    console.error(error); // Handle any errors
  });

// Function to set the height of #displayYInput
function setDisplayYInputHeight(height: string) {
  const displayYInput = document.querySelector<HTMLElement>('#displayYInput');
  if (displayYInput) {
    displayYInput.style.height = height;
  }
}

// Import and use the addFileUploadListener function from utils/imageUpload.ts
import { uploadGuardianImage } from './utils/forms/imageUpload';

const imageUploadInput = document.getElementById('imageUpload') as HTMLInputElement;
uploadGuardianImage(imageUploadInput);

// Import inputValidation functions
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhone,
} from './utils/forms/inputValidation';

// use event listeners to call all the inputValidation functions when a user interacts with an input element.
const phoneInput = document.getElementById('phoneInput');
if (phoneInput) phoneInput.addEventListener('input', validatePhone);

const firstNameInput = document.getElementById('firstNameInput');
if (firstNameInput) firstNameInput.addEventListener('input', validateFirstName);

const lastNameInput = document.getElementById('lastNameInput');
if (lastNameInput) lastNameInput.addEventListener('input', validateLastName);

const emailInput = document.getElementById('emailInput');
if (emailInput) emailInput.addEventListener('input', validateEmail);

// import updateGuardianProfile()
import { updateGuardianProfile } from './utils/requests/guardianRequests';

// prevent form submit button from submitting if any input is invalid
const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
submitButton.addEventListener('click', (e) => {
  if (!validatePhone()) {
    e.preventDefault();
    //display error message
    const submitError = document.getElementById('submitError') as HTMLDivElement;
    submitError.style.display = 'block';
    submitError.textContent = 'Please make sure you have entered all fields correctly.';
  } else {
    e.preventDefault();
    updateGuardianProfile();
  }
});

// import getStudentProfiles()
import { getStudentsDashboard } from './utils/requests/studentRequests';
getStudentsDashboard();

//import getTicketOrder()
import { getTicketOrder } from './utils/requests/getTicketOrders';
getTicketOrder();
