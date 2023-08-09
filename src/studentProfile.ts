// import authenticate from './authenticate';
import { authenticate } from './utils/requests/auth/authenticateUser';

// authenticate on page load
authenticate();

interface ApiResponse {
  id: number;
  userID: number;
  guardianUserID: number;
  airtableID: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
  school: string;
  grade: string;
  gender: string;
  ethnicity: string;
  health: string;
  emergencyContact: string;
  dismissal: string;
  photoRelease: boolean;
  independentTravel: boolean;
  sendTexts: boolean;
  family: string;
  additionalName: string;
  additionalEmail: string;
  additionalPhone: string;
  created_at: number;
  image: {
    path: string;
    name: string;
    type: string;
    size: number;
    mime: string;
    meta: {
      width: number;
      height: number;
    };
    url: string;
  };
}

function populateForm(response: ApiResponse) {
  function setValueIfNotNull(elementId: string, value: string) {
    const element = document.getElementById(elementId);
    if (element) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        (element as HTMLInputElement | HTMLTextAreaElement).value = value;
      } else if (element.tagName === 'SELECT') {
        const option = Array.from((element as HTMLSelectElement).options).find(
          (opt: HTMLOptionElement) => opt.value === value
        );
        if (option) {
          option.selected = true;
        }
      }
    }
  }

  setValueIfNotNull('firstNameInput', response.firstName);
  setValueIfNotNull('lastNameInput', response.lastName);
  setValueIfNotNull('phoneInput', response.phone);
  setValueIfNotNull('emailInput', response.email);
  setValueIfNotNull('dobInput', response.dob);
  setValueIfNotNull('schoolInput', response.school);
  setValueIfNotNull('gradeInput', response.grade);
  setValueIfNotNull('genderInput', response.gender);
  setValueIfNotNull('ethnicityInput', response.ethnicity);
  setValueIfNotNull('healthInput', response.health);
  setValueIfNotNull('emergencyContact', response.emergencyContact);
  setValueIfNotNull('dismissal', response.dismissal);

  const checkboxes = ['photoRelease', 'independentTravel', 'sendTexts'];
  checkboxes.forEach((checkbox) => {
    const checkboxElement = document.getElementById(checkbox) as HTMLInputElement;
    if (checkboxElement) {
      checkboxElement.checked = response[checkbox] as boolean;
    }
  });

  setValueIfNotNull('family', response.family);
  setValueIfNotNull('additionalName', response.additionalName);
  setValueIfNotNull('additionalEmail', response.additionalEmail);
  setValueIfNotNull('additionalPhone', response.additionalPhone);

  // Update studentName with firstName and lastName
  const studentNameElement = document.getElementById('studentName');
  if (studentNameElement) {
    const fullName = `${response.firstName} ${response.lastName}`;
    studentNameElement.textContent = fullName;
  }

  const imageElement = document.getElementById('profileImage') as HTMLImageElement;
  if (response.image && response.image.url) {
    imageElement.src = response.image.url;
  } else {
    // Set a default image or hide the image element
    // For example, you can set a placeholder image
    imageElement.src =
      'https://uploads-ssl.webflow.com/64404db37a2b832b7d5aa9f8/64713ce0d5227bcec70c5505_360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg';
    // Or hide the image element completely
    // imageElement.style.display = 'none';
  }

  const additionalCare = document.getElementById('additionalCare') as HTMLInputElement | null;
  const additionalOverflow = document.getElementById('additionalOverflow') as HTMLDivElement | null;
  if (additionalCare && additionalOverflow) {
    additionalCare.checked =
      !!response.additionalName || !!response.additionalEmail || !!response.additionalPhone;
    additionalOverflow.style.height = additionalCare.checked ? '32rem' : '0';
    additionalCare.addEventListener('click', () => {
      additionalOverflow.style.height = additionalCare.checked ? '32rem' : '0';
    });
  }

  const familyToggle = document.getElementById('familyToggle') as HTMLInputElement | null;
  const familyOverflow = document.getElementById('familyOverflow') as HTMLDivElement | null;
  if (familyToggle && familyOverflow) {
    familyToggle.checked = !!response.family;
    familyOverflow.style.height = familyToggle.checked ? '12rem' : '0';
    familyToggle.addEventListener('click', () => {
      familyOverflow.style.height = familyToggle.checked ? '12rem' : '0';
    });
  }
  // Store the studentID in localStorage
  if (response.id) {
    localStorage.setItem('studentID', String(response.id));
  }
}

window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const airtableID = urlParams.get('student');

  if (airtableID) {
    const apiUrl = `https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/getStudentProfile`;

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ airtableID }),
    })
      .then((response) => response.json())
      .then((data) => {
        populateForm(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  } else {
    console.error('Missing airtableID parameter in the URL');
  }
});

import { uploadStudentImage } from './utils/forms/imageUpload';
const imageUploadInput = document.getElementById('imageUpload') as HTMLInputElement;
uploadStudentImage(imageUploadInput);

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

const firstNameInput = document.getElementById('firstNameInput') as HTMLInputElement | null;
if (firstNameInput) firstNameInput.addEventListener('input', validateFirstName);

const lastNameInput = document.getElementById('lastNameInput') as HTMLInputElement | null;
if (lastNameInput) lastNameInput.addEventListener('input', validateLastName);

const emailInput = document.getElementById('emailInput') as HTMLInputElement | null;
if (emailInput) emailInput.addEventListener('input', validateEmail);

const phoneInput = document.getElementById('phoneInput') as HTMLInputElement | null;
if (phoneInput) phoneInput.addEventListener('input', validatePhone);

const dobInput = document.getElementById('dobInput') as HTMLInputElement | null;
if (dobInput) dobInput.addEventListener('input', validateDOB);

const genderInput = document.getElementById('genderInput') as HTMLInputElement | null;
if (genderInput) genderInput.addEventListener('input', validateGender);

const schoolInput = document.getElementById('schoolInput') as HTMLInputElement | null;
if (schoolInput) schoolInput.addEventListener('input', validateSchool);

const gradeInput = document.getElementById('gradeInput') as HTMLInputElement | null;
if (gradeInput) gradeInput.addEventListener('input', validateGrade);

const ethnicityInput = document.getElementById('ethnicityInput') as HTMLInputElement | null;
if (ethnicityInput) ethnicityInput.addEventListener('input', validateEthnicity);

const healthInput = document.getElementById('healthInput') as HTMLInputElement | null;
if (healthInput) healthInput.addEventListener('input', validateHealth);

const emergencyInput = document.getElementById('emergencyContact') as HTMLInputElement | null;
if (emergencyInput) emergencyInput.addEventListener('input', validateEmergency);

const dismissal = document.getElementById('dismissal') as HTMLInputElement | null;
if (dismissal) dismissal.addEventListener('input', validateDismissal);

const additionalEmail = document.getElementById('additionalEmail') as HTMLInputElement | null;
if (additionalEmail) additionalEmail.addEventListener('input', validateAdditionalEmail);

import { updateStudentProfile } from './utils/requests/studentRequests';

const submitButton = document.getElementById('submitButton') as HTMLButtonElement | null;
submitButton?.addEventListener('click', (e) => {
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
    !validateAdditionalEmail()
  ) {
    e.preventDefault();
    const submitError = document.getElementById('submitError') as HTMLDivElement | null;
    if (submitError) {
      submitError.style.display = 'block';
      submitError.textContent = 'Please make sure you have entered all fields correctly.';
    }
  } else {
    e.preventDefault();
    updateStudentProfile();
  }
});
