// Validate First Name Input
const firstNameInput = document.getElementById('firstNameInput') as HTMLInputElement;
const firstNameError = document.getElementById('firstNameError') as HTMLDivElement;

export function validateFirstName() {
  const isRequired = firstNameInput.hasAttribute('required');
  if (isRequired && firstNameInput.value.trim() === '') {
    firstNameError.textContent = 'First name required';
    firstNameError.style.display = 'block';
    firstNameInput.classList.add('error');
    return false;
  }
  firstNameError.textContent = '';
  firstNameError.style.display = 'none';
  firstNameInput.classList.remove('error');
  return true;
}

if (firstNameInput) {
  firstNameInput.addEventListener('blur', validateFirstName);
}

// Validate Last Name Input
const lastNameInput = document.getElementById('lastNameInput') as HTMLInputElement;
const lastNameError = document.getElementById('lastNameError') as HTMLDivElement;

export function validateLastName() {
  const isRequired = lastNameInput.hasAttribute('required');
  if (isRequired && lastNameInput.value.trim() === '') {
    lastNameError.textContent = 'Last name required';
    lastNameError.style.display = 'block';
    lastNameInput.classList.add('error');
    return false;
  }
  lastNameError.textContent = '';
  lastNameError.style.display = 'none';
  lastNameInput.classList.remove('error');
  return true;
}

if (lastNameInput) {
  lastNameInput.addEventListener('blur', validateLastName);
}

// Validate Email Input
const emailInput = document.getElementById('emailInput') as HTMLInputElement;
const emailError = document.getElementById('emailError') as HTMLDivElement;

export function validateEmail() {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (emailInput.hasAttribute('required') && emailInput.value.trim() === '') {
    emailError.textContent = 'Email is required';
    emailError.style.display = 'block';
    emailInput.classList.add('error');
    return false;
  }
  if (emailInput.value.trim() !== '' && !emailRegex.test(emailInput.value)) {
    emailError.textContent = 'Please enter a valid email';
    emailError.style.display = 'block';
    emailInput.classList.add('error');
    return false;
  }
  emailError.textContent = '';
  emailError.style.display = 'none';
  emailInput.classList.remove('error');
  return true;
}

if (emailInput) {
  emailInput.addEventListener('blur', validateEmail);
}

// Validate Password Input
const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
const passwordError = document.getElementById('passwordError') as HTMLDivElement;

export function validatePassword() {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Adjust regex based on your requirement
  if (passwordInput.hasAttribute('required') && passwordInput.value.trim() === '') {
    passwordError.textContent = 'Password is required';
    passwordError.style.display = 'block';
    passwordInput.classList.add('error');
    return false;
  }
  if (!passwordRegex.test(passwordInput.value)) {
    passwordError.textContent =
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
    passwordError.style.display = 'block';
    passwordInput.classList.add('error');
    return false;
  }
  passwordError.textContent = '';
  passwordError.style.display = 'none';
  passwordInput.classList.remove('error');
  return true;
}

if (passwordInput) {
  passwordInput.addEventListener('blur', validatePassword);
  passwordInput.addEventListener('input', validatePassword); // Validate password on each input
}

// Validate New Password Input
const newPasswordInput = document.getElementById('newPasswordInput') as HTMLInputElement;
const newPasswordError = document.getElementById('newPasswordError') as HTMLDivElement;

// Validate Confirm Password Input
const confirmPasswordInput = document.getElementById('confirmPasswordInput') as HTMLInputElement;
const confirmPasswordError = document.getElementById('confirmPasswordError') as HTMLDivElement;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function validateNewPassword() {
  if (newPasswordInput.hasAttribute('required') && newPasswordInput.value.trim() === '') {
    newPasswordError.textContent = 'New password is required';
    newPasswordError.style.display = 'block';
    newPasswordInput.classList.add('error');
    return false;
  }
  if (!passwordRegex.test(newPasswordInput.value)) {
    newPasswordError.textContent =
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
    newPasswordError.style.display = 'block';
    newPasswordInput.classList.add('error');
    return false;
  }
  newPasswordError.textContent = '';
  newPasswordError.style.display = 'none';
  newPasswordInput.classList.remove('error');
  return true;
}

export function validateConfirmPassword() {
  if (confirmPasswordInput.value !== newPasswordInput.value) {
    confirmPasswordError.textContent = 'Passwords do not match';
    confirmPasswordError.style.display = 'block';
    confirmPasswordInput.classList.add('error');
    return false;
  }
  confirmPasswordError.textContent = '';
  confirmPasswordError.style.display = 'none';
  confirmPasswordInput.classList.remove('error');
  return true;
}

if (newPasswordInput) {
  newPasswordInput.addEventListener('blur', validateNewPassword);
  newPasswordInput.addEventListener('input', validateNewPassword);
}

if (confirmPasswordInput) {
  confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
  confirmPasswordInput.addEventListener('input', validateConfirmPassword);
}

// Validate Phone Input
const phoneInput = document.getElementById('phoneInput') as HTMLInputElement;
const phoneError = document.getElementById('phoneError') as HTMLDivElement;

export function formatPhoneNumber(value: string) {
  const phoneNumber = value.replace(/\D/g, '');
  if (phoneNumber.length === 0) {
    return '';
  }
  if (phoneNumber.length < 4) {
    return `(${phoneNumber}`;
  }
  if (phoneNumber.length < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

export function validatePhone() {
  const phoneRegex = /^\D*(\d{3})\D*\D*(\d{3})\D*(\d{4})\D*$/;
  const isRequired = phoneInput.required;
  if (isRequired && phoneInput.value.trim() === '') {
    phoneError.textContent = 'Phone is required';
    phoneError.style.display = 'block';
    phoneInput.classList.add('error');
    return false;
  }
  if (phoneInput.value.trim() !== '' && !phoneRegex.test(phoneInput.value)) {
    phoneError.textContent = 'Please enter a valid phone number';
    phoneError.style.display = 'block';
    phoneInput.classList.add('error');
    return false;
  }
  phoneInput.value = formatPhoneNumber(phoneInput.value);
  phoneError.textContent = '';
  phoneError.style.display = 'none';
  phoneInput.classList.remove('error');
  return true;
}
if (phoneInput) {
  phoneInput.addEventListener('input', (event) => {
    const input = event.target as HTMLInputElement;
    input.value = formatPhoneNumber(input.value);
    validatePhone();
  });
}

//validate DOB
const dobInput = document.getElementById('dobInput') as HTMLInputElement;
const dobError = document.getElementById('dobError') as HTMLDivElement;

export function validateDOB() {
  if (dobInput.hasAttribute('required') && dobInput.value.trim() === '') {
    dobError.textContent = 'Date of Birth is required';
    dobError.style.display = 'block';
    dobInput.classList.add('error');
    return false;
  }
  dobError.textContent = '';
  dobError.style.display = 'none';
  dobInput.classList.remove('error');
  return true;
}

if (dobInput) {
  dobInput.addEventListener('blur', validateDOB);
}

//validate gender
const genderInput = document.getElementById('genderInput') as HTMLInputElement;
const genderError = document.getElementById('genderError') as HTMLDivElement;

export function validateGender() {
  if (genderInput.hasAttribute('required') && genderInput.value.trim() === '') {
    genderError.textContent = 'Gender is required';
    genderError.style.display = 'block';
    genderInput.classList.add('error');
    return false;
  }
  genderError.textContent = '';
  genderError.style.display = 'none';
  genderInput.classList.remove('error');
  return true;
}

if (genderInput) {
  genderInput.addEventListener('blur', validateGender);
}

// validate school name
const schoolInput = document.getElementById('schoolInput') as HTMLInputElement;
const schoolError = document.getElementById('schoolError') as HTMLDivElement;

export function validateSchool() {
  if (schoolInput.hasAttribute('required') && schoolInput.value.trim() === '') {
    schoolError.textContent = 'School name is required';
    schoolError.style.display = 'block';
    schoolInput.classList.add('error');
    return false;
  }
  schoolError.textContent = '';
  schoolError.style.display = 'none';
  schoolInput.classList.remove('error');
  return true;
}

if (schoolInput) {
  schoolInput.addEventListener('blur', validateSchool);
}

// validate grade
const gradeInput = document.getElementById('gradeInput') as HTMLInputElement;
const gradeError = document.getElementById('gradeError') as HTMLDivElement;

export function validateGrade() {
  if (gradeInput.hasAttribute('required') && gradeInput.value.trim() === 'N/A') {
    gradeError.textContent = 'Grade is required';
    gradeError.style.display = 'block';
    gradeInput.classList.add('error');
    return false;
  }
  gradeError.textContent = '';
  gradeError.style.display = 'none';
  gradeInput.classList.remove('error');
  return true;
}

if (gradeInput) {
  gradeInput.addEventListener('blur', validateGrade);
}

// validate ethnicity
const ethnicityInput = document.getElementById('ethnicityInput') as HTMLInputElement;
const ethnicityError = document.getElementById('ethnicityError') as HTMLDivElement;

export function validateEthnicity() {
  if (ethnicityInput.hasAttribute('required') && ethnicityInput.value.trim() === '') {
    ethnicityError.textContent = 'Ethnicity is required';
    ethnicityError.style.display = 'block';
    ethnicityInput.classList.add('error');
    return false;
  }
  ethnicityError.textContent = '';
  ethnicityError.style.display = 'none';
  ethnicityError.classList.remove('error');
  return true;
}

if (ethnicityError) {
  ethnicityInput.addEventListener('blur', validateEthnicity);
}

// validate health input
const healthInput = document.getElementById('healthInput') as HTMLInputElement;
const healthError = document.getElementById('healthError') as HTMLDivElement;

export function validateHealth() {
  if (healthInput.hasAttribute('required') && healthInput.value.trim() === '') {
    healthError.textContent = 'This field is required';
    healthError.style.display = 'block';
    healthInput.classList.add('error');
    return false;
  }
  healthError.textContent = '';
  healthError.style.display = 'none';
  healthInput.classList.remove('error');
  return true;
}

if (healthInput) {
  healthInput.addEventListener('blur', validateHealth);
}

// validate emergency contact
const emergencyInput = document.getElementById('emergencyContact') as HTMLInputElement;
const emergencyError = document.getElementById('emergencyError') as HTMLDivElement;

export function validateEmergency() {
  if (emergencyInput.hasAttribute('required') && emergencyInput.value.trim() === '') {
    emergencyError.textContent = 'This field is required';
    emergencyError.style.display = 'block';
    emergencyInput.classList.add('error');
    return false;
  }
  emergencyError.textContent = '';
  emergencyError.style.display = 'none';
  emergencyInput.classList.remove('error');
  return true;
}

if (emergencyInput) {
  emergencyInput.addEventListener('blur', validateEmergency);
}

// validate dismissal
const dismissal = document.getElementById('dismissal') as HTMLInputElement;
const dismissalError = document.getElementById('dismissalError') as HTMLDivElement;

export function validateDismissal() {
  if (dismissal.hasAttribute('required') && dismissal.value.trim() === '') {
    dismissalError.textContent = 'This field is required';
    dismissalError.style.display = 'block';
    dismissal.classList.add('error');
    return false;
  }
  dismissalError.textContent = '';
  dismissalError.style.display = 'none';
  dismissal.classList.remove('error');
  return true;
}

if (dismissal) {
  dismissal.addEventListener('blur', validateDismissal);
}

// Validate Additional Email
const additionalEmail = document.getElementById('additionalEmail') as HTMLInputElement;
const additionalEmailError = document.getElementById('additionalEmailError') as HTMLDivElement;

export function validateAdditionalEmail() {
  const additionalEmailRegex = /^\S+@\S+\.\S+$/;
  if (additionalEmail.hasAttribute('required') && additionalEmail.value.trim() === '') {
    additionalEmailError.textContent = 'Email is required';
    additionalEmailError.style.display = 'block';
    additionalEmail.classList.add('error');
    return false;
  }
  if (additionalEmail.value.trim() !== '' && !additionalEmailRegex.test(additionalEmail.value)) {
    additionalEmailError.textContent = 'Please enter a valid email';
    additionalEmailError.style.display = 'block';
    additionalEmail.classList.add('error');
    return false;
  }
  additionalEmailError.textContent = '';
  additionalEmailError.style.display = 'none';
  additionalEmail.classList.remove('error');
  return true;
}

if (additionalEmail) {
  additionalEmail.addEventListener('blur', validateAdditionalEmail);
}

// Validate interestInput
const interestInput = document.getElementById('interestInput') as HTMLInputElement;
const interestError = document.getElementById('interestError') as HTMLDivElement;

export function validateInterest() {
  if (interestInput.hasAttribute('required') && interestInput.value.trim() === '') {
    interestError.textContent = 'This field is required';
    interestError.style.display = 'block';
    interestInput.classList.add('error');
    return false;
  }
  interestError.textContent = '';
  interestError.style.display = 'none';
  interestInput.classList.remove('error');
  return true;
}

if (interestInput) {
  interestInput.addEventListener('blur', validateInterest);
}

// validate blood type
const bloodType = document.getElementById('bloodType') as HTMLInputElement;
const bloodTypeError = document.getElementById('bloodTypeError') as HTMLDivElement;

export function validateBloodType() {
  if (bloodType.hasAttribute('required') && bloodType.value.trim() === '') {
    bloodTypeError.textContent = 'This field is required';
    bloodTypeError.style.display = 'block';
    bloodType.classList.add('error');
    return false;
  }
  bloodTypeError.textContent = '';
  bloodTypeError.style.display = 'none';
  bloodType.classList.remove('error');
  return true;
}
