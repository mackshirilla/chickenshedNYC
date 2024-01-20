"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

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
  var passwordInput = document.getElementById("passwordInput");
  var passwordError = document.getElementById("passwordError");
  function validatePassword() {
    const passwordRegex2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordInput.hasAttribute("required") && passwordInput.value.trim() === "") {
      passwordError.textContent = "Password is required";
      passwordError.style.display = "block";
      passwordInput.classList.add("error");
      return false;
    }
    if (!passwordRegex2.test(passwordInput.value)) {
      passwordError.textContent = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
      passwordError.style.display = "block";
      passwordInput.classList.add("error");
      return false;
    }
    passwordError.textContent = "";
    passwordError.style.display = "none";
    passwordInput.classList.remove("error");
    return true;
  }
  if (passwordInput) {
    passwordInput.addEventListener("blur", validatePassword);
    passwordInput.addEventListener("input", validatePassword);
  }
  var newPasswordInput = document.getElementById("newPasswordInput");
  var newPasswordError = document.getElementById("newPasswordError");
  var confirmPasswordInput = document.getElementById("confirmPasswordInput");
  var confirmPasswordError = document.getElementById("confirmPasswordError");
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  function validateNewPassword() {
    if (newPasswordInput.hasAttribute("required") && newPasswordInput.value.trim() === "") {
      newPasswordError.textContent = "New password is required";
      newPasswordError.style.display = "block";
      newPasswordInput.classList.add("error");
      return false;
    }
    if (!passwordRegex.test(newPasswordInput.value)) {
      newPasswordError.textContent = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
      newPasswordError.style.display = "block";
      newPasswordInput.classList.add("error");
      return false;
    }
    newPasswordError.textContent = "";
    newPasswordError.style.display = "none";
    newPasswordInput.classList.remove("error");
    return true;
  }
  function validateConfirmPassword() {
    if (confirmPasswordInput.value !== newPasswordInput.value) {
      confirmPasswordError.textContent = "Passwords do not match";
      confirmPasswordError.style.display = "block";
      confirmPasswordInput.classList.add("error");
      return false;
    }
    confirmPasswordError.textContent = "";
    confirmPasswordError.style.display = "none";
    confirmPasswordInput.classList.remove("error");
    return true;
  }
  if (newPasswordInput) {
    newPasswordInput.addEventListener("blur", validateNewPassword);
    newPasswordInput.addEventListener("input", validateNewPassword);
  }
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("blur", validateConfirmPassword);
    confirmPasswordInput.addEventListener("input", validateConfirmPassword);
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
  var bloodType = document.getElementById("bloodType");
  var bloodTypeError = document.getElementById("bloodTypeError");

  // src/resetPassword.ts
  window.onload = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/password-request";
    }
  };
  async function submitPasswordReset() {
    const newPasswordInput2 = document.getElementById("newPasswordInput");
    const confirmPasswordInput2 = document.getElementById("confirmPasswordInput");
    const submitError = document.getElementById("submitError");
    const successMessage = document.getElementById("successMessage");
    const loadingAnimation = document.getElementById("loadingAnimation");
    const loginWrapper = document.getElementById("loginWrapper");
    if (!validateNewPassword() || !validateConfirmPassword()) {
      submitError.textContent = "Please correct the errors before submitting.";
      submitError.style.display = "block";
      return;
    }
    loadingAnimation.style.display = "block";
    submitError.style.display = "none";
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      submitError.textContent = "Authentication token is missing.";
      submitError.style.display = "block";
      loadingAnimation.style.display = "none";
      return;
    }
    try {
      const response = await fetch("https://xszy-vp96-kdkh.n7c.xano.io/api:WyQO-hFi/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          newPassword: newPasswordInput2.value,
          confirmPassword: confirmPasswordInput2.value
        })
      });
      loadingAnimation.style.display = "none";
      if (response.ok) {
        loginWrapper.style.display = "none";
        successMessage.style.display = "block";
      } else {
        const responseData = await response.json();
        submitError.textContent = responseData.message;
        submitError.style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
      submitError.textContent = "An error occurred while trying to reset the password.";
      submitError.style.display = "block";
      loadingAnimation.style.display = "none";
    }
  }
  var submitButton = document.getElementById("submitButton");
  if (submitButton) {
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      submitPasswordReset();
    });
  }
})();
//# sourceMappingURL=resetPassword.js.map
