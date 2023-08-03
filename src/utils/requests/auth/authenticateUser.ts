//Authenticate User
export function authenticate() {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    // authToken not found in local storage. Handle this case as you see fit.
    console.error('authToken not found in local storage.');
    window.location.href = '/login';
    return;
  }

  return fetch('https://x8ki-letl-twmt.n7.xano.io/api:WyQO-hFi/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
      window.location.href = '/log-in'; // Redirect unauthenticated user
    });
}
