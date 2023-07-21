// Finish Guardian Account Setup
export async function finishGuardianAccountSetup() {
  const profileString = localStorage.getItem('profile');
  const profile = profileString ? JSON.parse(profileString) : null;
  const guardianID = profile ? profile.id : null;

  if (!guardianID) {
    // Handle the case when guardianID is not found in localStorage
    return;
  }

  const loadingAnimation = document.getElementById('loadingAnimation') as HTMLDivElement;
  const phoneInput = document.getElementById('phoneInput') as HTMLInputElement;
  const sendTexts = document.getElementById('sendTexts') as HTMLInputElement;
  const yMember = document.getElementById('yMember') as HTMLInputElement;
  const membershipNumber = document.getElementById('membershipNumber') as HTMLInputElement;

  if (loadingAnimation && phoneInput && sendTexts && yMember && membershipNumber) {
    loadingAnimation.style.display = 'block';

    const guardianInfo = {
      phone: phoneInput.value,
      sendTexts: sendTexts.checked,
      isYMember: yMember.checked,
      membershipNumber: membershipNumber.value,
      guardianID: guardianID,
    };

    try {
      const response = await fetch(
        `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/guardians/${guardianID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(guardianInfo),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        // display submitError
        const submitError = document.getElementById('submitError') as HTMLDivElement;
        if (submitError) {
          submitError.style.display = 'block';
          submitError.textContent = responseData.message;
        }
        if (loadingAnimation) {
          loadingAnimation.style.display = 'none';
        }
      } else {
        // store profile in localStorage
        const responseData = await response.json();
        localStorage.setItem('profile', JSON.stringify(responseData));

        const redirectURL = localStorage.getItem('redirectURL');
        if (redirectURL) {
          localStorage.removeItem('redirectURL');
          window.location.href = redirectURL;
        } else {
          window.location.href = '/create-account/step-2';
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (loadingAnimation) {
        loadingAnimation.style.display = 'none';
      }
    }
  }
}

// Get Guardian Profile
interface GuardianProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  image?: {
    path: string;
    name: string;
    type: string;
    size: number;
    mime: string;
    meta: {
      width: number;
      height: number;
    };
    url: string; // Added 'url' property here
  };
  id?: string;
  sendTexts?: boolean;
  yMembership?: string;
}
export function getGuardianProfile(): Promise<GuardianProfile> {
  const profileString = localStorage.getItem('profile');

  if (!profileString) {
    return Promise.reject(new Error('Profile not found in localStorage'));
  }

  const profile: GuardianProfile = JSON.parse(profileString);

  const guardianId = profile.id;

  if (!guardianId) {
    return Promise.reject(new Error('Guardian ID not found in profile'));
  }

  const url = `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/guardians/${guardianId}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<GuardianProfile>;
    })
    .then((data) => {
      //console.log('Response:', data); // Log the response in the console

      // Populate the input fields with the response data
      const firstNameInput = document.getElementById('firstNameInput') as HTMLInputElement;
      firstNameInput.value = data.firstName ?? '';

      const lastNameInput = document.getElementById('lastNameInput') as HTMLInputElement;
      lastNameInput.value = data.lastName ?? '';

      const phoneInput = document.getElementById('phoneInput') as HTMLInputElement;
      phoneInput.value = data.phoneNumber ?? '';

      const emailInput = document.getElementById('emailInput') as HTMLInputElement;
      emailInput.value = data.email ?? '';

      // Set the value of the sendTexts checkbox
      const sendTextsCheckbox = document.getElementById('sendTexts') as HTMLInputElement;
      sendTextsCheckbox.checked = data.sendTexts ?? false;

      // Set the value of the yMember checkbox
      const yMemberCheckbox = document.getElementById('yMember') as HTMLInputElement;
      yMemberCheckbox.checked = data.yMembership !== undefined && data.yMembership !== '';

      // Populate the yMember input if it has a value
      const membershipNumberInput = document.getElementById('membershipNumber') as HTMLInputElement;
      membershipNumberInput.value = data.yMembership ?? '';

      // Populate the profile image
      const profileImage = document.getElementById('profileImage') as HTMLImageElement;
      profileImage.src =
        data.image?.url ??
        'https://assets.website-files.com/64404db37a2b832b7d5aa9f8/64404db37a2b831d465aaa01_image.svg';
      profileImage.alt = `${data.firstName ?? ''} ${data.lastName ?? ''}'s profile picture`;

      return data; // Return the data
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error or propagate it to the caller as needed
      throw error;
    });
}

// Update Guardian Profile
export async function updateGuardianProfile() {
  const profileString = localStorage.getItem('profile');
  const profile = profileString ? JSON.parse(profileString) : null;
  const guardianID = profile ? profile.id : null;

  if (!guardianID) {
    // Handle the case when guardianID is not found in localStorage
    return;
  }

  const loadingAnimation = document.getElementById('loadingAnimation') as HTMLDivElement;
  const firstNameInput = document.getElementById('firstNameInput') as HTMLInputElement;
  const lastNameInput = document.getElementById('lastNameInput') as HTMLInputElement;
  const emailInput = document.getElementById('emailInput') as HTMLInputElement;
  const phoneInput = document.getElementById('phoneInput') as HTMLInputElement;
  const sendTexts = document.getElementById('sendTexts') as HTMLInputElement;
  const yMember = document.getElementById('yMember') as HTMLInputElement;
  const membershipNumber = document.getElementById('membershipNumber') as HTMLInputElement;

  if (
    loadingAnimation &&
    firstNameInput &&
    lastNameInput &&
    emailInput &&
    phoneInput &&
    sendTexts &&
    yMember &&
    membershipNumber
  ) {
    loadingAnimation.style.display = 'block';

    const guardianInfo = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      sendTexts: sendTexts.checked,
      isYMember: yMember.checked,
      membershipNumber: membershipNumber.value,
      guardianID: guardianID,
    };

    try {
      const response = await fetch(
        `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/guardians/${guardianID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(guardianInfo),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        // display submitError
        const submitError = document.getElementById('submitError') as HTMLDivElement;
        if (submitError) {
          submitError.style.display = 'block';
          submitError.textContent = responseData.message;
        }
        if (loadingAnimation) {
          loadingAnimation.style.display = 'none';
        }
      } else {
        // reload the page
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (loadingAnimation) {
        loadingAnimation.style.display = 'none';
      }
    }
  }
}
