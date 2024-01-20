export async function createAccountWithPassword() {
  // Get input values
  // eslint-disable-next-line prettier/prettier
  const firstNameInput = document.getElementById('firstNameInput') as HTMLInputElement;
  const lastNameInput = document.getElementById('lastNameInput') as HTMLInputElement;
  const emailInput = document.getElementById('emailInput') as HTMLInputElement;
  const passwordInput = document.getElementById('passwordInput') as HTMLInputElement; // New line for password input
  const submitAccountError = document.getElementById('submitAccountError') as HTMLDivElement;
  const loadingAccountAnimation = document.getElementById(
    'loadingAccountAnimation'
  ) as HTMLDivElement;

  // Display loading animation
  loadingAccountAnimation.style.display = 'block';

  // Hide the error message
  submitAccountError.style.display = 'none';

  // Send post request to Xano API endpoint
  try {
    const response = await fetch('https://xszy-vp96-kdkh.n7c.xano.io/api:WyQO-hFi/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value, // Add the password field here
      }),
    });

    // Hide loading animation
    loadingAccountAnimation.style.display = 'none';

    // Process the response
    if (!response.ok) {
      const responseData = await response.json();

      submitAccountError.textContent = responseData.message || 'An error occurred';
      submitAccountError.style.display = 'block';
    } else {
      // Extract authToken from response
      const responseData = await response.json();

      // Store response data to local storage
      localStorage.setItem('profile', JSON.stringify(responseData.userCreated));
      // Store authToken to local storage
      localStorage.setItem('authToken', responseData.authToken);
      // Store role to local storage
      localStorage.setItem('role', responseData.role);
      // get local storage profile role
      const profile = JSON.parse(localStorage.getItem('profile') || '{}');
      const { role } = profile;
      // redirect to correct page based on role
      if (window.location.href.includes('/sessions')) {
        window.location.href = '/create-account/add-student-profile';
        localStorage.setItem('redirectURL', window.location.href);
      } else {
        window.location.href = '/create-account/account-details';
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    loadingAccountAnimation.style.display = 'none';
  }
}
