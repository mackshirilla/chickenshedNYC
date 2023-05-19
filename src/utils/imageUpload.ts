//Guardian Image Upload

export function uploadGuardianImage(inputElement: HTMLInputElement) {
  inputElement.addEventListener('change', async () => {
    const profileImage = document.getElementById('profileImage') as HTMLImageElement;
    const fileError = document.getElementById('fileError') as HTMLDivElement;
    const fileUploaded = document.getElementById('fileUploaded') as HTMLDivElement;
    const loadingImageAnimation = document.getElementById(
      'loadingImageAnimation'
    ) as HTMLDivElement;
    const selectedImage = inputElement.files?.[0];

    if (selectedImage) {
      if (selectedImage.size > 2 * 1024 * 1024) {
        fileError.textContent = 'File size must be less than 2MB';
        fileError.style.display = 'block';
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        profileImage.src = reader.result as string;

        fileError.textContent = '';
        fileError.style.display = 'none';

        // Show loading animation
        loadingImageAnimation.style.display = 'flex';

        try {
          // Get the studentID from localStorage
          const guardianID = localStorage.getItem('guardianID');

          // Send the base64 string and studentID to the endpoint
          const response = await fetch(
            'https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/studentImages',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                guardianID,
                guardianImage: reader.result,
              }),
            }
          );

          // Check if the request was successful
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          } else {
            // Handle the response data accordingly
            fileUploaded.style.display = 'block';
          }
        } catch (error) {
          // Display the error message in the fileError div
          fileError.textContent = (error as Error).message;
          fileError.style.display = 'block';
        } finally {
          // Hide loading animation
          loadingImageAnimation.style.display = 'none';
        }
      };

      reader.readAsDataURL(selectedImage);
    } else {
      profileImage.src =
        'https://assets.website-files.com/64404db37a2b832b7d5aa9f8/64404db37a2b831d465aaa01_image.svg';
      fileError.textContent = '';
      fileError.style.display = 'none';
    }
  });
}

//Student Image Upload

export function uploadStudentImage(inputElement: HTMLInputElement) {
  inputElement.addEventListener('change', async () => {
    const profileImage = document.getElementById('profileImage') as HTMLImageElement;
    const fileError = document.getElementById('fileError') as HTMLDivElement;
    const fileUploaded = document.getElementById('fileUploaded') as HTMLDivElement;
    const loadingImageAnimation = document.getElementById(
      'loadingImageAnimation'
    ) as HTMLDivElement;
    const selectedImage = inputElement.files?.[0];

    if (selectedImage) {
      if (selectedImage.size > 2 * 1024 * 1024) {
        fileError.textContent = 'File size must be less than 2MB';
        fileError.style.display = 'block';
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        profileImage.src = reader.result as string;

        fileError.textContent = '';
        fileError.style.display = 'none';

        // Show loading animation
        loadingImageAnimation.style.display = 'flex';

        try {
          // Get the studentID from localStorage
          const studentID = localStorage.getItem('studentID');

          // Send the base64 string and studentID to the endpoint
          const response = await fetch(
            'https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/studentImages',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                studentID,
                studentImage: reader.result,
              }),
            }
          );

          // Check if the request was successful
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          } else {
            // Handle the response data accordingly
            fileUploaded.style.display = 'block';
          }
        } catch (error) {
          // Display the error message in the fileError div
          fileError.textContent = (error as Error).message;
          fileError.style.display = 'block';
        } finally {
          // Hide loading animation
          loadingImageAnimation.style.display = 'none';
        }
      };

      reader.readAsDataURL(selectedImage);
    } else {
      profileImage.src =
        'https://assets.website-files.com/64404db37a2b832b7d5aa9f8/64404db37a2b831d465aaa01_image.svg';
      fileError.textContent = '';
      fileError.style.display = 'none';
    }
  });
}
