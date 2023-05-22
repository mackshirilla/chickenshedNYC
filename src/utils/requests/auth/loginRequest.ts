// create login function
export async function login() {
  const emailInput = document.getElementById('emailInput') as HTMLInputElement;
  const submitError = document.getElementById('submitError') as HTMLDivElement;
  const successMessage = document.getElementById('successMessage') as HTMLDivElement;
  const loginWrapper = document.getElementById('loginWrapper') as HTMLDivElement;
  const loadingAnimation = document.getElementById('loadingAnimation') as HTMLDivElement;

  // display loading animation
  loadingAnimation.style.display = 'block';
  // hide error message
  submitError.style.display = 'none';

  try {
    const email = emailInput.value;
    const url = `https://x8ki-letl-twmt.n7.xano.io/api:WyQO-hFi/auth/magic-link?email=${encodeURIComponent(
      email
    )}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
      // hide login wrapper
      loginWrapper.style.display = 'none';
      // display success message
      successMessage.style.display = 'block';
    }
  } catch (error) {
    // Error handling
  } finally {
    // hide loading animation
    loadingAnimation.style.display = 'none';
  }
}
