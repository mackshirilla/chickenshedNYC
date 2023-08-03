// Authenticate User
export function authenticate(): Promise<void> {
  const authToken = localStorage.getItem('authToken');

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
      // if .page-wrapper has the attribute gated
      const pageWrapper = document.querySelector('.page-wrapper') as HTMLElement;
      const isGated = pageWrapper && pageWrapper.hasAttribute('gatedContent');

      if (isGated) {
        // redirect to login page
        window.location.href = '/login';
        localStorage.removeItem('authToken');
        localStorage.removeItem('profile');
        localStorage.removeItem('role');
      } else {
        // remove authToken, profile, and role from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('profile');
        localStorage.removeItem('role');
      }
    });
}
