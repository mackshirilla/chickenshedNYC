// authenticate user on page load
import { authenticate } from './utils/requests/auth/authenticateUser';

//run authenticate function
authenticate();
//console.log('authenticated');

// hide #progressBar if redirectURL is not in localStorage
const redirectURL = localStorage.getItem('redirectURL');
const progressBar = document.getElementById('progressBar');
if (!redirectURL && progressBar) {
  progressBar.style.display = 'none';
} else if (progressBar) {
  progressBar.style.display = 'block';
}

//remove studentID fom localStorage
localStorage.removeItem('studentID');

// Import and use the addFileUploadListener function from utils/imageUpload.ts
import { uploadGuardianImage } from './utils/forms/imageUpload';

const imageUploadInput = document.getElementById('imageUpload') as HTMLInputElement;
uploadGuardianImage(imageUploadInput);

// Import inputValidation functions
import { validatePhone } from './utils/forms/inputValidation';

// use event listeners to call all the inputValidation functions when a user interacts with an input element.
const phoneInput = document.getElementById('phoneInput');
if (phoneInput) phoneInput.addEventListener('input', validatePhone);

//display input if checkbox with ID yMember is checked
const yMember = document.getElementById('yMember') as HTMLInputElement;
const yMemberInput = document.getElementById('displayYInput') as HTMLInputElement;
yMember.addEventListener('change', () => {
  if (yMember.checked) {
    //set time out to animate open
    setTimeout(() => {
      yMemberInput.style.height = '6.5rem';
    }, 0);
  } else {
    yMemberInput.style.height = '0rem';
  }
});

//toggle recieve text messages text
const sendTexts = document.getElementById('sendTexts') as HTMLInputElement;
sendTexts.addEventListener('change', () => {
  //get .toggle-text element by id textsToggleText
  const toggleText = document.getElementById('textsToggleText') as HTMLSpanElement;
  if (sendTexts.checked) {
    toggleText.textContent = 'Yes';
  } else {
    toggleText.textContent = 'No';
  }
});
//toggle yMember text
yMember.addEventListener('change', () => {
  //get .toggle-text element by id yMemberToggleText
  const toggleText = document.getElementById('yMemberToggleText') as HTMLSpanElement;
  if (yMember.checked) {
    toggleText.textContent = 'Yes';
  } else {
    toggleText.textContent = 'No';
  }
});

//import finishGuardianAccoutSetup function
import { finishGuardianAccountSetup } from './utils/requests/guardianRequests';

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
    finishGuardianAccountSetup();
  }
});
