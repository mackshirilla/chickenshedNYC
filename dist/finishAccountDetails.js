"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/requests/auth/authenticateUser.ts
  function authenticate() {
    const authToken = localStorage.getItem("authToken");
    return fetch("https://x8ki-letl-twmt.n7.xano.io/api:WyQO-hFi/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }).catch((error) => {
      console.error("Error:", error);
      const pageWrapper = document.querySelector(".page-wrapper");
      const isGated = pageWrapper && pageWrapper.hasAttribute("gatedContent");
      if (isGated) {
        window.location.href = "/login";
        localStorage.removeItem("authToken");
        localStorage.removeItem("profile");
        localStorage.removeItem("role");
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("profile");
        localStorage.removeItem("role");
      }
    });
  }

  // src/utils/forms/imageUpload.ts
  function uploadGuardianImage(inputElement) {
    inputElement.addEventListener("change", async () => {
      const profileImage = document.getElementById("profileImage");
      const fileError = document.getElementById("fileError");
      const fileUploaded = document.getElementById("fileUploaded");
      const loadingImageAnimation = document.getElementById(
        "loadingImageAnimation"
      );
      const selectedImage = inputElement.files?.[0];
      if (selectedImage) {
        if (selectedImage.size > 2 * 1024 * 1024) {
          fileError.textContent = "File size must be less than 2MB";
          fileError.style.display = "block";
          return;
        }
        const reader = new FileReader();
        reader.onload = async () => {
          profileImage.src = reader.result;
          fileError.textContent = "";
          fileError.style.display = "none";
          loadingImageAnimation.style.display = "flex";
          try {
            const profileString = localStorage.getItem("profile");
            const profile = profileString ? JSON.parse(profileString) : null;
            const guardianID = profile ? profile.id : null;
            const response = await fetch(
              "https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/guardianImages",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  guardianID,
                  guardianImage: reader.result
                })
              }
            );
            if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
            } else {
              fileUploaded.style.display = "block";
            }
          } catch (error) {
            fileError.textContent = error.message;
            fileError.style.display = "block";
          } finally {
            loadingImageAnimation.style.display = "none";
          }
        };
        reader.readAsDataURL(selectedImage);
      } else {
        profileImage.src = "https://assets.website-files.com/64404db37a2b832b7d5aa9f8/64404db37a2b831d465aaa01_image.svg";
        fileError.textContent = "";
        fileError.style.display = "none";
      }
    });
  }

  // src/utils/forms/inputValidation.ts
  var firstNameInput = document.getElementById("firstNameInput");
  var firstNameError = document.getElementById("firstNameError");
  function validateFirstName() {
    const isRequired = firstNameInput.hasAttribute("required");
    if (isRequired && firstNameInput.value.trim() === "") {
      firstNameError.textContent = "First name required";
      firstNameError.style.display = "block";
      firstNameInput.classList.add("error");
      return false;
    }
    firstNameError.textContent = "";
    firstNameError.style.display = "none";
    firstNameInput.classList.remove("error");
    return true;
  }
  if (firstNameInput) {
    firstNameInput.addEventListener("blur", validateFirstName);
  }
  var lastNameInput = document.getElementById("lastNameInput");
  var lastNameError = document.getElementById("lastNameError");
  function validateLastName() {
    const isRequired = lastNameInput.hasAttribute("required");
    if (isRequired && lastNameInput.value.trim() === "") {
      lastNameError.textContent = "Last name required";
      lastNameError.style.display = "block";
      lastNameInput.classList.add("error");
      return false;
    }
    lastNameError.textContent = "";
    lastNameError.style.display = "none";
    lastNameInput.classList.remove("error");
    return true;
  }
  if (lastNameInput) {
    lastNameInput.addEventListener("blur", validateLastName);
  }
  var emailInput = document.getElementById("emailInput");
  var emailError = document.getElementById("emailError");
  function validateEmail() {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (emailInput.hasAttribute("required") && emailInput.value.trim() === "") {
      emailError.textContent = "Email is required";
      emailError.style.display = "block";
      emailInput.classList.add("error");
      return false;
    }
    if (emailInput.value.trim() !== "" && !emailRegex.test(emailInput.value)) {
      emailError.textContent = "Please enter a valid email";
      emailError.style.display = "block";
      emailInput.classList.add("error");
      return false;
    }
    emailError.textContent = "";
    emailError.style.display = "none";
    emailInput.classList.remove("error");
    return true;
  }
  if (emailInput) {
    emailInput.addEventListener("blur", validateEmail);
  }
  var phoneInput = document.getElementById("phoneInput");
  var phoneError = document.getElementById("phoneError");
  function formatPhoneNumber(value) {
    const phoneNumber = value.replace(/\D/g, "");
    if (phoneNumber.length === 0) {
      return "";
    }
    if (phoneNumber.length < 4) {
      return `(${phoneNumber}`;
    }
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }
  function validatePhone() {
    const phoneRegex = /^\D*(\d{3})\D*\D*(\d{3})\D*(\d{4})\D*$/;
    const isRequired = phoneInput.required;
    if (isRequired && phoneInput.value.trim() === "") {
      phoneError.textContent = "Phone is required";
      phoneError.style.display = "block";
      phoneInput.classList.add("error");
      return false;
    }
    if (phoneInput.value.trim() !== "" && !phoneRegex.test(phoneInput.value)) {
      phoneError.textContent = "Please enter a valid phone number";
      phoneError.style.display = "block";
      phoneInput.classList.add("error");
      return false;
    }
    phoneInput.value = formatPhoneNumber(phoneInput.value);
    phoneError.textContent = "";
    phoneError.style.display = "none";
    phoneInput.classList.remove("error");
    return true;
  }
  if (phoneInput) {
    phoneInput.addEventListener("input", (event) => {
      const input = event.target;
      input.value = formatPhoneNumber(input.value);
      validatePhone();
    });
  }
  var dobInput = document.getElementById("dobInput");
  var dobError = document.getElementById("dobError");
  function validateDOB() {
    if (dobInput.hasAttribute("required") && dobInput.value.trim() === "") {
      dobError.textContent = "Date of Birth is required";
      dobError.style.display = "block";
      dobInput.classList.add("error");
      return false;
    }
    dobError.textContent = "";
    dobError.style.display = "none";
    dobInput.classList.remove("error");
    return true;
  }
  if (dobInput) {
    dobInput.addEventListener("blur", validateDOB);
  }
  var genderInput = document.getElementById("genderInput");
  var genderError = document.getElementById("genderError");
  function validateGender() {
    if (genderInput.hasAttribute("required") && genderInput.value.trim() === "") {
      genderError.textContent = "Gender is required";
      genderError.style.display = "block";
      genderInput.classList.add("error");
      return false;
    }
    genderError.textContent = "";
    genderError.style.display = "none";
    genderInput.classList.remove("error");
    return true;
  }
  if (genderInput) {
    genderInput.addEventListener("blur", validateGender);
  }
  var schoolInput = document.getElementById("schoolInput");
  var schoolError = document.getElementById("schoolError");
  function validateSchool() {
    if (schoolInput.hasAttribute("required") && schoolInput.value.trim() === "") {
      schoolError.textContent = "School name is required";
      schoolError.style.display = "block";
      schoolInput.classList.add("error");
      return false;
    }
    schoolError.textContent = "";
    schoolError.style.display = "none";
    schoolInput.classList.remove("error");
    return true;
  }
  if (schoolInput) {
    schoolInput.addEventListener("blur", validateSchool);
  }
  var gradeInput = document.getElementById("gradeInput");
  var gradeError = document.getElementById("gradeError");
  function validateGrade() {
    if (gradeInput.hasAttribute("required") && gradeInput.value.trim() === "N/A") {
      gradeError.textContent = "Grade is required";
      gradeError.style.display = "block";
      gradeInput.classList.add("error");
      return false;
    }
    gradeError.textContent = "";
    gradeError.style.display = "none";
    gradeInput.classList.remove("error");
    return true;
  }
  if (gradeInput) {
    gradeInput.addEventListener("blur", validateGrade);
  }
  var ethnicityInput = document.getElementById("ethnicityInput");
  var ethnicityError = document.getElementById("ethnicityError");
  function validateEthnicity() {
    if (ethnicityInput.hasAttribute("required") && ethnicityInput.value.trim() === "") {
      ethnicityError.textContent = "Ethnicity is required";
      ethnicityError.style.display = "block";
      ethnicityInput.classList.add("error");
      return false;
    }
    ethnicityError.textContent = "";
    ethnicityError.style.display = "none";
    ethnicityError.classList.remove("error");
    return true;
  }
  if (ethnicityError) {
    ethnicityInput.addEventListener("blur", validateEthnicity);
  }
  var healthInput = document.getElementById("healthInput");
  var healthError = document.getElementById("healthError");
  function validateHealth() {
    if (healthInput.hasAttribute("required") && healthInput.value.trim() === "") {
      healthError.textContent = "This field is required";
      healthError.style.display = "block";
      healthInput.classList.add("error");
      return false;
    }
    healthError.textContent = "";
    healthError.style.display = "none";
    healthInput.classList.remove("error");
    return true;
  }
  if (healthInput) {
    healthInput.addEventListener("blur", validateHealth);
  }
  var emergencyInput = document.getElementById("emergencyContact");
  var emergencyError = document.getElementById("emergencyError");
  function validateEmergency() {
    if (emergencyInput.hasAttribute("required") && emergencyInput.value.trim() === "") {
      emergencyError.textContent = "This field is required";
      emergencyError.style.display = "block";
      emergencyInput.classList.add("error");
      return false;
    }
    emergencyError.textContent = "";
    emergencyError.style.display = "none";
    emergencyInput.classList.remove("error");
    return true;
  }
  if (emergencyInput) {
    emergencyInput.addEventListener("blur", validateEmergency);
  }
  var dismissal = document.getElementById("dismissal");
  var dismissalError = document.getElementById("dismissalError");
  function validateDismissal() {
    if (dismissal.hasAttribute("required") && dismissal.value.trim() === "") {
      dismissalError.textContent = "This field is required";
      dismissalError.style.display = "block";
      dismissal.classList.add("error");
      return false;
    }
    dismissalError.textContent = "";
    dismissalError.style.display = "none";
    dismissal.classList.remove("error");
    return true;
  }
  if (dismissal) {
    dismissal.addEventListener("blur", validateDismissal);
  }
  var additionalEmail = document.getElementById("additionalEmail");
  var additionalEmailError = document.getElementById("additionalEmailError");
  function validateAdditionalEmail() {
    const additionalEmailRegex = /^\S+@\S+\.\S+$/;
    if (additionalEmail.hasAttribute("required") && additionalEmail.value.trim() === "") {
      additionalEmailError.textContent = "Email is required";
      additionalEmailError.style.display = "block";
      additionalEmail.classList.add("error");
      return false;
    }
    if (additionalEmail.value.trim() !== "" && !additionalEmailRegex.test(additionalEmail.value)) {
      additionalEmailError.textContent = "Please enter a valid email";
      additionalEmailError.style.display = "block";
      additionalEmail.classList.add("error");
      return false;
    }
    additionalEmailError.textContent = "";
    additionalEmailError.style.display = "none";
    additionalEmail.classList.remove("error");
    return true;
  }
  if (additionalEmail) {
    additionalEmail.addEventListener("blur", validateAdditionalEmail);
  }
  var interestInput = document.getElementById("interestInput");
  var interestError = document.getElementById("interestError");
  function validateInterest() {
    if (interestInput.hasAttribute("required") && interestInput.value.trim() === "") {
      interestError.textContent = "This field is required";
      interestError.style.display = "block";
      interestInput.classList.add("error");
      return false;
    }
    interestError.textContent = "";
    interestError.style.display = "none";
    interestInput.classList.remove("error");
    return true;
  }
  if (interestInput) {
    interestInput.addEventListener("blur", validateInterest);
  }

  // src/utils/requests/guardianRequests.ts
  async function finishGuardianAccountSetup() {
    const profileString = localStorage.getItem("profile");
    const profile = profileString ? JSON.parse(profileString) : null;
    const guardianID = profile ? profile.id : null;
    if (!guardianID) {
      return;
    }
    const loadingAnimation = document.getElementById("loadingAnimation");
    const phoneInput3 = document.getElementById("phoneInput");
    const sendTexts2 = document.getElementById("sendTexts");
    const yMember2 = document.getElementById("yMember");
    const membershipNumber = document.getElementById("membershipNumber");
    if (loadingAnimation && phoneInput3 && sendTexts2 && yMember2 && membershipNumber) {
      loadingAnimation.style.display = "block";
      const guardianInfo = {
        phone: phoneInput3.value,
        sendTexts: sendTexts2.checked,
        isYMember: yMember2.checked,
        membershipNumber: membershipNumber.value,
        guardianID
      };
      try {
        const response = await fetch(
          `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/guardians/${guardianID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(guardianInfo)
          }
        );
        if (!response.ok) {
          const responseData = await response.json();
          const submitError = document.getElementById("submitError");
          if (submitError) {
            submitError.style.display = "block";
            submitError.textContent = responseData.message;
          }
          if (loadingAnimation) {
            loadingAnimation.style.display = "none";
          }
        } else {
          const responseData = await response.json();
          localStorage.setItem("profile", JSON.stringify(responseData));
          const redirectURL2 = localStorage.getItem("redirectURL");
          if (redirectURL2) {
            localStorage.removeItem("redirectURL");
            window.location.href = redirectURL2;
          } else {
            window.location.href = "/create-account/step-2";
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (loadingAnimation) {
          loadingAnimation.style.display = "none";
        }
      }
    }
  }

  // src/finishAccountDetails.ts
  authenticate();
  var redirectURL = localStorage.getItem("redirectURL");
  var progressBar = document.getElementById("progressBar");
  if (!redirectURL && progressBar) {
    progressBar.style.display = "none";
  } else if (progressBar) {
    progressBar.style.display = "block";
  }
  localStorage.removeItem("studentID");
  var imageUploadInput = document.getElementById("imageUpload");
  uploadGuardianImage(imageUploadInput);
  var phoneInput2 = document.getElementById("phoneInput");
  if (phoneInput2)
    phoneInput2.addEventListener("input", validatePhone);
  var yMember = document.getElementById("yMember");
  var yMemberInput = document.getElementById("displayYInput");
  yMember.addEventListener("change", () => {
    if (yMember.checked) {
      setTimeout(() => {
        yMemberInput.style.height = "6.5rem";
      }, 0);
    } else {
      yMemberInput.style.height = "0rem";
    }
  });
  var sendTexts = document.getElementById("sendTexts");
  sendTexts.addEventListener("change", () => {
    const toggleText = document.getElementById("textsToggleText");
    if (sendTexts.checked) {
      toggleText.textContent = "Yes";
    } else {
      toggleText.textContent = "No";
    }
  });
  yMember.addEventListener("change", () => {
    const toggleText = document.getElementById("yMemberToggleText");
    if (yMember.checked) {
      toggleText.textContent = "Yes";
    } else {
      toggleText.textContent = "No";
    }
  });
  var submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", (e) => {
    if (!validatePhone()) {
      e.preventDefault();
      const submitError = document.getElementById("submitError");
      submitError.style.display = "block";
      submitError.textContent = "Please make sure you have entered all fields correctly.";
    } else {
      e.preventDefault();
      finishGuardianAccountSetup();
    }
  });
})();
//# sourceMappingURL=finishAccountDetails.js.map
