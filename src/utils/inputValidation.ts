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

firstNameInput.addEventListener('blur', () => {
  validateFirstName();
});

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

lastNameInput.addEventListener('blur', () => {
  validateLastName();
});

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

emailInput.addEventListener('blur', () => {
  validateEmail();
});

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

phoneInput.addEventListener('blur', () => {
  validatePhone();
});

phoneInput.addEventListener('input', (event) => {
  const input = event.target as HTMLInputElement;
  input.value = formatPhoneNumber(input.value);
  validatePhone();
});
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

dobInput.addEventListener('blur', () => {
  validateDOB();
});
//profile image
const input_file = document.getElementById('input_file') as HTMLInputElement;
const profileImage = document.getElementById('profileImage') as HTMLImageElement;
const fileError = document.getElementById('fileError') as HTMLDivElement;

export let uploadImage: File | null = null;

input_file.addEventListener('change', () => {
  const selectedImage = input_file.files?.[0];
  if (selectedImage) {
    if (selectedImage.size > 2 * 1024 * 1024) {
      fileError.textContent = 'File size must be less than 2MB';
      fileError.style.display = 'block';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = () => {
      profileImage.src = reader.result as string;
    };
    uploadImage = selectedImage;
    fileError.textContent = '';
    fileError.style.display = 'none';
  } else {
    profileImage.src =
      'https://assets.website-files.com/64404db37a2b832b7d5aa9f8/64404db37a2b831d465aaa01_image.svg';
    uploadImage = null;
    fileError.textContent = '';
    fileError.style.display = 'none';
  }
});
