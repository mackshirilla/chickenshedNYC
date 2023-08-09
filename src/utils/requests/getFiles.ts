export function fetchFiles() {
  const profileData = localStorage.getItem('profile');
  const role = localStorage.getItem('role'); // fetch 'role' from localStorage

  const id = profileData ? JSON.parse(profileData).id : null;

  if (!id) {
    // eslint-disable-next-line no-console
    console.error(
      'ID not found in the "profile" object in localStorage. Make sure the "profile" object is set properly.'
    );
    return;
  }

  const endpointURL = 'https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/Get_Files';
  const postData = {
    id: id,
    role: role,
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  };

  const fileListWrapper = document.getElementById('fileListWrapper');
  const noFiles = document.getElementById('noFiles');
  const fileTemplate = document.getElementById('fileItem');

  if (!fileListWrapper || !noFiles || !fileTemplate) {
    console.error("Some DOM elements couldn't be found.");
    return;
  }

  fetch(endpointURL, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      // eslint-disable-next-line no-console
      console.log('Response:', data);

      const loadingWall = document.getElementById('loadingWall');
      if (loadingWall) {
        loadingWall.style.display = 'none';
      }

      if (Array.isArray(data) && data.length > 0) {
        fileListWrapper.innerHTML = '';

        data.forEach((fileWrapper) => {
          const file = fileWrapper[0];

          if (file && file.name && file.filelink) {
            const fileElement = fileTemplate.cloneNode(true) as HTMLElement;

            const fileNameElement = fileElement.querySelector('#fileName');
            if (fileNameElement) {
              fileNameElement.textContent = file.name;
            }

            const fileLinkElement = fileElement.querySelector('#fileLink') as HTMLAnchorElement; // Add type assertion here
            if (fileLinkElement) {
              fileLinkElement.href = file.filelink;
            }

            fileListWrapper.appendChild(fileElement);
          }
        });

        fileListWrapper.style.display = 'grid';
        noFiles.style.display = 'none';
      } else {
        fileListWrapper.style.display = 'none';
        noFiles.style.display = 'block';
      }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    });
}
