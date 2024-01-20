export async function loginWithPassword() {
  const emailInput = document.getElementById('emailInput') as HTMLInputElement;
  const passwordInput = document.getElementById('passwordInput') as HTMLInputElement; // Password input field
  const submitError = document.getElementById('submitError') as HTMLDivElement;
  const loadingAnimation = document.getElementById('loadingAnimation') as HTMLDivElement;

  // Display loading animation
  loadingAnimation.style.display = 'block';
  // Hide error message
  submitError.style.display = 'none';

  try {
    const email = emailInput.value;
    const password = passwordInput.value; // Get the password value

    // Endpoint for email and password login
    const url = 'https://xszy-vp96-kdkh.n7c.xano.io/api:WyQO-hFi/auth/login';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password, // Include password in the request
      }),
    });

    // Process the response
    if (!response.ok) {
      const responseData = await response.json();
      submitError.textContent = responseData.message || 'An error occurred';
      submitError.style.display = 'block';
    } else {
      const responseData = await response.json();

      // Store authToken, profile, and role in local storage
      localStorage.setItem('authToken', responseData.authToken);
      localStorage.setItem('profile', JSON.stringify(responseData.profile[0]));
      localStorage.setItem('role', responseData.role);

      // Redirect based on role
      if (responseData.role === 'guardian') {
        window.location.href = '/create-account/step-2';
      } else {
        window.location.href = '/student-dashboard';
      }
    }
  } catch (error) {
    console.error(error);
    submitError.textContent = 'Login failed. Please try again.';
    submitError.style.display = 'block';
  } finally {
    loadingAnimation.style.display = 'none';
  }
}
