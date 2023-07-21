//create account function
export async function createAccount() {
  // Get input values
  const firstNameInput = document.getElementById('firstNameInput') as HTMLInputElement;
  const lastNameInput = document.getElementById('lastNameInput') as HTMLInputElement;
  const emailInput = document.getElementById('emailInput') as HTMLInputElement;
  const submitAccountError = document.getElementById('submitAccountError') as HTMLDivElement;
  const loadingAccountAnimation = document.getElementById(
    'loadingAccountAnimation'
  ) as HTMLDivElement;
  //display loading animation
  loadingAccountAnimation.style.display = 'block';
  // Hide the error message
  submitAccountError.style.display = 'none';
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
    loadingAccountAnimation.style.display = 'none';

    // Process the response
    if (!response.ok) {
      const responseData = await response.json();

      submitAccountError.textContent = responseData.message || 'An error occurred';
      // Show the error message
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
      // if url contains /sessions redirect to /create-account/add-student-profile
      if (window.location.href.includes('/sessions')) {
        window.location.href = '/create-account/add-student-profile';
        // and store current url in local storage as redirectUrl
        localStorage.setItem('redirectURL', window.location.href);
      } // else redirect to /create-account/step-2
      else {
        window.location.href = '/create-account/account-details';
      } // end if
    }
  } catch (error) {
    console.error(error);
  } finally {
    // Hide loading animation
    loadingAccountAnimation.style.display = 'none';
  }
}
