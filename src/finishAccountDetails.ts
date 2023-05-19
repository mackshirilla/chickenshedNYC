// authenticate user on page load
import { authenticate } from './utils/requests/authenticateUser';
//run authenticate function
authenticate();
//console.log('authenticated');

//remove studentID fom localStorage
localStorage.removeItem('studentID');

// Import and use the addFileUploadListener function from utils/imageUpload.ts
import { uploadStudentImage } from './utils/imageUpload';

const imageUploadInput = document.getElementById('imageUpload') as HTMLInputElement;
uploadStudentImage(imageUploadInput);

// Import inputValidation functions
import { validatePhone } from './utils/inputValidation';

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
