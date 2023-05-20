//create account function
export async function createAccount() {
  // Get input values
  const firstNameInput = document.getElementById('firstNameInput') as HTMLInputElement;
  const lastNameInput = document.getElementById('lastNameInput') as HTMLInputElement;
  const emailInput = document.getElementById('emailInput') as HTMLInputElement;
  const isStudentSwitch = document.getElementById('isStudent') as HTMLInputElement;
  const submitError = document.getElementById('submitError') as HTMLDivElement;
  const loadingAnimation = document.getElementById('loadingAnimation') as HTMLDivElement;
  //display loading animation
  loadingAnimation.style.display = 'block';
  // Hide the error message
  submitError.style.display = 'none';
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
        isStudent: isStudentSwitch.checked,
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
      // Extract authToken from response
      const responseData = await response.json();

      // Store response data to local storage
      localStorage.setItem('profile', JSON.stringify(responseData));
      // Store authToken to local storage
      localStorage.setItem('authToken', responseData.authToken);
      // get local storage profile role
      const profile = JSON.parse(localStorage.getItem('profile') || '{}');
      const { role } = profile;
      // redirect to correct page based on role
      if (role === 'student') {
        window.location.href = 'my-account/finish-student-profile';
      } else if (role === 'guardian') {
        window.location.href = 'my-account/step-2';
      } else {
        // display error saying can't find profile role
        submitError.textContent = 'No profile role found';
        // Show the error message
        submitError.style.display = 'block';
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    // Hide loading animation
    loadingAnimation.style.display = 'none';
  }
}
