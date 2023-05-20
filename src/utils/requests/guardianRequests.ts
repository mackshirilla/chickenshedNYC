//Finish Guardian Account Setup
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
        window.location.href = '/my-account/setup-complete';
        //console.log(responseData);
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
