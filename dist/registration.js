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

  // src/registration.ts
  var studentsSelected = [];
  var priceID = null;
  async function fetchStudentProfiles(guardianUserID) {
    const response = await fetch(
      `https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/student_profiles?guardianUserID=${guardianUserID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (!response.ok) {
      const responseData2 = await response.json();
      throw new Error(responseData2.message || "An error occurred");
    }
    const responseData = await response.json();
    return responseData.allStudentProfiles;
  }
  async function handleStudentProfiles() {
    const profileString = localStorage.getItem("profile");
    const profile = profileString ? JSON.parse(profileString) : null;
    const guardianUserID = profile?.userID;
    const userRole = profile?.role;
    const loadingAnimation = document.getElementById("loadingAnimation");
    const registrationFormWrapper = document.getElementById(
      "registrationFormWrapper"
    );
    const noStudentProfiles = document.getElementById("NoStudentProfiles");
    const studentAccount = document.getElementById("studentAccount");
    registrationFormWrapper.style.display = "none";
    studentAccount.style.display = "none";
    noStudentProfiles.style.display = "none";
    loadingAnimation.style.display = "block";
    if (userRole === "student") {
      studentAccount.style.display = "block";
      registrationFormWrapper.style.display = "none";
    } else {
      studentAccount.style.display = "none";
      registrationFormWrapper.style.display = "block";
    }
    try {
      const allStudentProfiles = await fetchStudentProfiles(guardianUserID);
      if (allStudentProfiles.length > 0) {
        const studentList = document.getElementById("studentList");
        const studentCardTemplate = document.getElementById("studentItem");
        studentList.innerHTML = "";
        allStudentProfiles.forEach((studentProfile) => {
          const clonedTemplate = studentCardTemplate.cloneNode(true);
          const studentNameElement = clonedTemplate.querySelector(".fs_checkbox-1_label");
          const studentCheckbox = clonedTemplate.querySelector(
            'input[type="checkbox"]'
          );
          if (studentNameElement) {
            studentNameElement.textContent = `${studentProfile.firstName} ${studentProfile.lastName}`;
          }
          if (studentCheckbox) {
            studentCheckbox.value = studentProfile.id.toString();
            studentCheckbox.addEventListener("change", () => {
              if (studentCheckbox.checked) {
                studentsSelected.push(studentProfile);
              } else {
                const index = studentsSelected.findIndex(
                  (student) => student.id === studentProfile.id
                );
                if (index !== -1) {
                  studentsSelected.splice(index, 1);
                }
              }
              console.log("Selected Student Profiles:", studentsSelected);
            });
          }
          studentList.appendChild(clonedTemplate);
        });
        studentCardTemplate.style.display = "none";
        studentList.style.display = "grid";
        loadingAnimation.style.display = "none";
        registrationFormWrapper.style.display = "block";
      } else {
        loadingAnimation.style.display = "none";
        noStudentProfiles.style.display = "block";
        registrationFormWrapper.style.display = "none";
      }
    } catch (error) {
      console.error("An error occurred while fetching student profiles:", error);
      alert("An error occurred while fetching student profiles.");
    }
  }
  function handleRadioButtons() {
    const radioButtons = document.querySelectorAll('input[name="paymentType"]');
    radioButtons.forEach((radio) => {
      radio.addEventListener("change", function() {
        if (this.checked) {
          priceID = this.getAttribute("priceid");
          console.log(`Selected payment type: ${this.value}`);
          console.log(`Updated priceID: ${priceID}`);
          if (this.value === "Deposit") {
            const depositOnly = document.getElementById("depositOnly");
            depositOnly.value = "true";
            const toggleNoOverflow = document.getElementById("toggleNoOverflow");
            toggleNoOverflow.style.height = "16rem";
          } else {
            const depositOnly = document.getElementById("depositOnly");
            depositOnly.value = "false";
            const toggleNoOverflow = document.getElementById("toggleNoOverflow");
            toggleNoOverflow.style.height = "0rem";
          }
        }
      });
    });
  }
  function handleFormSubmit() {
    const submitButton = document.getElementById("submitButton");
    const studentListError = document.getElementById("studentListError");
    const paymentError = document.getElementById("paymentError");
    const submitError = document.getElementById("submitError");
    const requestLoadingAnimation = document.getElementById("requestLoadingAnimation");
    if (submitButton) {
      submitButton.addEventListener("click", async (event) => {
        event.preventDefault();
        let errorFlag = false;
        if (studentListError)
          studentListError.style.display = "none";
        if (paymentError)
          paymentError.style.display = "none";
        if (submitError)
          submitError.style.display = "none";
        if (studentsSelected.length === 0) {
          if (studentListError) {
            studentListError.style.display = "block";
            studentListError.innerText = "This field is required";
          }
          errorFlag = true;
        }
        if (!priceID) {
          if (paymentError) {
            paymentError.style.display = "block";
            paymentError.innerText = "This field is required";
          }
          errorFlag = true;
        }
        const interest = document.getElementById("interestInput");
        const interestError2 = document.getElementById("interestError");
        const interestValue = interest.value;
        const interestValid = validateInterest(interestValue);
        if (!interestValid) {
          if (interestError2) {
            interestError2.style.display = "block";
            interestError2.innerText = "This field is required";
          } else {
            interestError2.style.display = "none";
          }
          errorFlag = true;
        }
        if (errorFlag) {
          if (submitError)
            submitError.style.display = "block";
          if (submitError)
            submitError.innerText = "Please make sure all required fields are filled";
          return;
        }
        const profileString = localStorage.getItem("profile");
        const profile = profileString ? JSON.parse(profileString) : null;
        const userID = profile?.userID;
        const firstName = profile?.firstName;
        const lastName = profile?.lastName;
        const finAidCheckbox = document.getElementById("finAid");
        const finPlanCheckbox = document.getElementById("finPlan");
        const contactListIDInput = document.getElementById("contactListID");
        const sessionIDInput = document.getElementById("sessionID");
        const followUpEmailInput = document.getElementById("followUpEmailID");
        const colorInput = document.getElementById("color");
        const imageURLInput = document.getElementById("imageURL");
        const programInput = document.getElementById("program");
        const workshopInput = document.getElementById("workshop");
        const sessionTimeInput = document.getElementById("sessionTime");
        const sessionDayInput = document.getElementById("sessionDay");
        const depositOnlyInput = document.getElementById("depositOnly");
        const startDateInput = document.getElementById("startDate");
        const endDateInput = document.getElementById("endDate");
        const paymentTypeRadioButtons = document.querySelectorAll(
          'input[name="paymentType"]:checked'
        );
        const selectedPaymentTypeRadioButton = paymentTypeRadioButtons[0];
        const unitAmount = selectedPaymentTypeRadioButton ? selectedPaymentTypeRadioButton.getAttribute("unitAmount") : null;
        const studentIDs = studentsSelected.map((student) => student.id);
        const studentNames = studentsSelected.map(
          (student) => `${student.firstName} ${student.lastName}`
        );
        const color = colorInput ? colorInput.value : "";
        const imageURL = imageURLInput ? imageURLInput.value : "";
        const program = programInput ? programInput.value : "";
        const workshop = workshopInput ? workshopInput.value : "";
        const sessionTime = sessionTimeInput ? sessionTimeInput.value : "";
        const sessionDay = sessionDayInput ? sessionDayInput.value : "";
        const finAid = finAidCheckbox ? finAidCheckbox.checked : false;
        const finPlan = finPlanCheckbox ? finPlanCheckbox.checked : false;
        const depositOnly = depositOnlyInput ? depositOnlyInput.value : "false";
        const emailFollowUpID = followUpEmailInput ? followUpEmailInput.value : "";
        const sessionID = sessionIDInput ? sessionIDInput.value : "";
        const contactListID = contactListIDInput ? contactListIDInput.value : "";
        const startDate = startDateInput ? startDateInput.value : "";
        const endDate = endDateInput ? endDateInput.value : "";
        const contactLists = contactListID.split(",").map((item) => item.trim()).filter((item) => item);
        if (requestLoadingAnimation)
          requestLoadingAnimation.style.display = "block";
        try {
          const response = await fetch("https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/cart_items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userID,
              firstName,
              lastName,
              studentIDs,
              studentNames,
              priceID,
              unitAmount,
              color,
              imageURL,
              program,
              workshop,
              sessionTime,
              sessionDay,
              finAid,
              finPlan,
              depositOnly,
              quantity: studentsSelected.length,
              emailFollowUpID,
              sessionID,
              contactLists,
              startDate,
              endDate,
              interest: interestValue
            })
          });
          if (response.ok) {
            if (requestLoadingAnimation)
              requestLoadingAnimation.style.display = "none";
            window.location.href = "/my-account/cart";
          } else {
            throw new Error("An error occurred while submitting the form");
          }
        } catch (error) {
          console.error(error);
          if (requestLoadingAnimation)
            requestLoadingAnimation.style.display = "none";
          if (submitError)
            submitError.style.display = "block";
        }
      });
    }
  }
  function handleFreeFormSubmit() {
    const freeSubmitButton = document.getElementById("freeSubmitButton");
    const studentListError = document.getElementById("studentListError");
    const submitError = document.getElementById("submitError");
    const freeRequestLoadingAnimation = document.getElementById("freeRequestLoadingAnimation");
    if (freeSubmitButton) {
      freeSubmitButton.addEventListener("click", async (event) => {
        event.preventDefault();
        let errorFlag = false;
        if (studentListError) {
          studentListError.style.display = "none";
        }
        if (submitError) {
          submitError.style.display = "none";
        }
        if (studentsSelected.length === 0) {
          if (studentListError) {
            studentListError.style.display = "block";
            studentListError.innerText = "This field is required";
          }
          errorFlag = true;
        }
        if (errorFlag) {
          if (submitError) {
            submitError.style.display = "block";
            submitError.innerText = "Please make sure all required fields are filled";
          }
          return;
        }
        const interest = document.getElementById("interestInput");
        const interestError2 = document.getElementById("interestError");
        const interestValue = interest.value;
        const interestValid = validateInterest(interestValue);
        if (!interestValid) {
          if (interestError2) {
            interestError2.style.display = "block";
            interestError2.innerText = "This field is required";
          } else {
            interestError2.style.display = "none";
          }
          errorFlag = true;
        }
        const profileString = localStorage.getItem("profile");
        const profile = profileString ? JSON.parse(profileString) : null;
        const userID = profile?.userID;
        const firstName = profile?.firstName;
        const lastName = profile?.lastName;
        const contactListIDInput = document.getElementById("contactListID");
        const sessionIDInput = document.getElementById("sessionID");
        const followUpEmailInput = document.getElementById("followUpEmailID");
        const colorInput = document.getElementById("color");
        const imageURLInput = document.getElementById("imageURL");
        const programInput = document.getElementById("program");
        const workshopInput = document.getElementById("workshop");
        const sessionTimeInput = document.getElementById("sessionTime");
        const sessionDayInput = document.getElementById("sessionDay");
        const startDateInput = document.getElementById("startDate");
        const endDateInput = document.getElementById("endDate");
        const studentIDs = studentsSelected.map((student) => student.id);
        const studentNames = studentsSelected.map(
          (student) => `${student.firstName} ${student.lastName}`
        );
        const color = colorInput ? colorInput.value : "";
        const imageURL = imageURLInput ? imageURLInput.value : "";
        const program = programInput ? programInput.value : "";
        const workshop = workshopInput ? workshopInput.value : "";
        const sessionTime = sessionTimeInput ? sessionTimeInput.value : "";
        const sessionDay = sessionDayInput ? sessionDayInput.value : "";
        const emailFollowUpID = followUpEmailInput ? followUpEmailInput.value : "";
        const sessionID = sessionIDInput ? sessionIDInput.value : "";
        const contactListID = contactListIDInput ? contactListIDInput.value : "";
        const startDate = startDateInput ? startDateInput.value : "";
        const endDate = endDateInput ? endDateInput.value : "";
        const contactLists = contactListID.split(",").map((item) => item.trim()).filter(Boolean);
        if (freeRequestLoadingAnimation) {
          freeRequestLoadingAnimation.style.display = "block";
        }
        try {
          const response = await fetch(
            "https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/FREE_REGISTRATION",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                userID,
                firstName,
                lastName,
                studentIDs,
                studentNames,
                color,
                imageURL,
                program,
                workshop,
                sessionTime,
                sessionDay,
                emailFollowUpID,
                sessionID,
                contactLists,
                startDate,
                endDate,
                interest: interestValue
              })
            }
          );
          if (response.ok) {
            window.location.href = "/successful-checkout";
          } else {
            throw new Error("An error occurred while submitting the form");
          }
        } catch (error) {
          console.error(error);
          if (submitError) {
            submitError.style.display = "block";
          }
        } finally {
          if (freeRequestLoadingAnimation) {
            freeRequestLoadingAnimation.style.display = "none";
          }
        }
      });
    }
  }
  document.addEventListener("DOMContentLoaded", function() {
    const notLoggedInElement = document.getElementById("NotLoggedIn");
    const registrationFormWrapper = document.getElementById("registrationFormWrapper");
    const loadingAnimation = document.getElementById("loadingAnimation");
    if (localStorage.getItem("profile") === null) {
      if (notLoggedInElement) {
        notLoggedInElement.style.display = "block";
      }
      if (registrationFormWrapper) {
        registrationFormWrapper.style.display = "none";
        loadingAnimation.style.display = "none";
      }
    } else {
      if (notLoggedInElement) {
        notLoggedInElement.style.display = "none";
      }
      if (registrationFormWrapper) {
        registrationFormWrapper.style.display = "block";
        handleStudentProfiles();
      }
    }
    const role2 = localStorage.getItem("role");
    if (role2 === "student") {
      const studentAccount = document.getElementById("studentAccount");
      const registrationFormWrapper2 = document.getElementById("registrationFormWrapper");
      if (studentAccount) {
        studentAccount.style.display = "block";
        registrationFormWrapper2.style.display = "none";
      }
    }
    const finAidCheckbox = document.getElementById("finAid");
    const finPlanCheckbox = document.getElementById("finPlan");
    const depositRadioButton = document.querySelector(
      'input[name="paymentType"][value="Deposit"]'
    );
    const otherRadioButtons = Array.from(
      document.querySelectorAll('input[name="paymentType"]:not([value="Deposit"])')
    );
    if (finAidCheckbox) {
      finAidCheckbox.addEventListener("change", () => {
        if (finAidCheckbox.checked || finPlanCheckbox && finPlanCheckbox.checked) {
          depositRadioButton.click();
        }
      });
    }
    if (finPlanCheckbox) {
      finPlanCheckbox.addEventListener("change", () => {
        if (finPlanCheckbox.checked || finAidCheckbox && finAidCheckbox.checked) {
          depositRadioButton.click();
        }
      });
    }
    otherRadioButtons.forEach((radioButton) => {
      radioButton.addEventListener("change", () => {
        if (radioButton.checked) {
          if (finAidCheckbox)
            finAidCheckbox.checked = false;
          if (finPlanCheckbox)
            finPlanCheckbox.checked = false;
        }
      });
    });
    handleRadioButtons();
    handleFormSubmit();
    handleFreeFormSubmit();
    const finAidText = document.getElementById("finAidText");
    if (finAidCheckbox) {
      finAidCheckbox.addEventListener("change", () => {
        if (finAidCheckbox.checked) {
          finAidText.innerText = "Yes";
        } else {
          finAidText.innerText = "No";
        }
      });
    }
    const finPlanText = document.getElementById("finPlanText");
    if (finPlanCheckbox) {
      finPlanCheckbox.addEventListener("change", () => {
        if (finPlanCheckbox.checked) {
          finPlanText.innerText = "Yes";
        } else {
          finPlanText.innerText = "No";
        }
      });
    }
  });
  var addStudentButton = document.getElementById("addStudent");
  if (addStudentButton) {
    addStudentButton.addEventListener("click", () => {
      localStorage.setItem("redirectURL", window.location.href);
      window.location.href = "/create-account/add-student";
    });
  }
  var role = localStorage.getItem("role");
  if (role === "student") {
    const addStudentsWrapper = document.getElementById("addStudentsWrapper");
    if (addStudentsWrapper) {
      addStudentsWrapper.style.display = "none";
    }
  }
})();
//# sourceMappingURL=registration.js.map
