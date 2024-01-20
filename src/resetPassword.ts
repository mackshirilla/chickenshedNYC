import { validateConfirmPassword, validateNewPassword } from './utils/forms/inputValidation';

// Check for authToken on load and redirect if not found
window.onload = () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    window.location.href = '/password-request';
  }
};

async function submitPasswordReset() {
  const newPasswordInput = document.getElementById('newPasswordInput') as HTMLInputElement;
  const confirmPasswordInput = document.getElementById('confirmPasswordInput') as HTMLInputElement;
  const submitError = document.getElementById('submitError') as HTMLDivElement;
  const successMessage = document.getElementById('successMessage') as HTMLDivElement;
  const loadingAnimation = document.getElementById('loadingAnimation') as HTMLDivElement;
  const loginWrapper = document.getElementById('loginWrapper') as HTMLDivElement;

  if (!validateNewPassword() || !validateConfirmPassword()) {
    submitError.textContent = 'Please correct the errors before submitting.';
    submitError.style.display = 'block';
    return;
  }

  loadingAnimation.style.display = 'block';
  submitError.style.display = 'none';

  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    submitError.textContent = 'Authentication token is missing.';
    submitError.style.display = 'block';
    loadingAnimation.style.display = 'none';
    return;
  }

  try {
    const response = await fetch('https://xszy-vp96-kdkh.n7c.xano.io/api:WyQO-hFi/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        newPassword: newPasswordInput.value,
        confirmPassword: confirmPasswordInput.value,
      }),
    });

    loadingAnimation.style.display = 'none';

    if (response.ok) {
      loginWrapper.style.display = 'none';
      successMessage.style.display = 'block';
    } else {
      const responseData = await response.json();
      submitError.textContent = responseData.message;
      submitError.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
    submitError.textContent = 'An error occurred while trying to reset the password.';
    submitError.style.display = 'block';
    loadingAnimation.style.display = 'none';
  }
}

const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
if (submitButton) {
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    submitPasswordReset();
  });
}
