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

// Handle form submission
const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
const submitError = document.getElementById('submitError') as HTMLDivElement;
const loadingAnimation = document.getElementById('loadingAnimation') as HTMLDivElement;

// Hide the error and loading animation initially
submitError.style.display = 'none';
loadingAnimation.style.display = 'none';

submitButton.addEventListener('click', async (e) => {
  // Immediately prevent default form behavior
  e.preventDefault();

  // Validate all fields
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isEmailValid = validateEmail();

  if (!isFirstNameValid || !isLastNameValid || !isEmailValid) {
    return;
  }

  // Show loading animation
  loadingAnimation.style.display = 'block';

  // Send post request to xano api endpoint
  try {
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:WyQO-hFi/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
      }),
    });

    // Hide loading animation
    loadingAnimation.style.display = 'none';

    // Process the response
    if (!response.ok) {
      const responseData = await response.json();

      submitError.textContent = responseData.message || 'An error occurred';
      // Show the error message
      submitError.style.display = 'block';
    } else {
      // Handle successful response
      const responseData = await response.json();
      // Set authToken in a cookie
      document.cookie = `authToken=${responseData.authToken}; path=/`;

      // Redirect to new path on successful response
      window.location.href = '/my-account/step-2';
    }
  } catch (error) {
    // Network or other fetch errors
    const errorMsg = (error as Error).message;
    submitError.textContent = errorMsg || 'An error occurred';
    // Show the error message
    submitError.style.display = 'block';

    // Hide loading animation
    loadingAnimation.style.display = 'none';
  }
});
