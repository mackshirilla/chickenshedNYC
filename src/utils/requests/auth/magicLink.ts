async function magicLink() {
  const verificationError = document.getElementById('verificationError');
  const magicToken = new URLSearchParams(window.location.search).get('magic_token');

  if (!magicToken) {
    if (verificationError) {
      verificationError.style.display = 'block';
      verificationError.textContent = 'Uh oh! No Magic Token found. Please log in again.';
    }
    return;
  }

  try {
    const response = await fetch(
      'https://x8ki-letl-twmt.n7.xano.io/api:WyQO-hFi/auth/magic-login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ magic_token: magicToken }),
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      if (verificationError) {
        verificationError.style.display = 'block';
        verificationError.textContent = responseData.message;
      }
    } else {
      //store authToken from response in localStorage
      const responseData = await response.json();
      console.log(responseData);
      localStorage.setItem('authToken', responseData.authToken);
      //store first item in profile array in localStorage
      localStorage.setItem('profile', JSON.stringify(responseData.profile[0]));
      //store role from response in localStorage
      localStorage.setItem('role', responseData.role);
      //redirect to my-account page
      window.location.href = '/create-account/step-2';
    }
  } catch (error) {
    // Handle any errors that may occur during the fetch request
    console.error(error);
  }
}

//run magicLink function on page load
magicLink();
