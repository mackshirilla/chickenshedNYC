"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/requests/auth/authenticateUser.ts
  function authenticate() {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/login";
      return Promise.reject();
    }
    return fetch("https://xszy-vp96-kdkh.n7c.xano.io/api:WyQO-hFi/auth/me", {
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
      }
    });
  }

  // src/utils/forms/imageUpload.ts
  function uploadStudentImage(inputElement) {
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
            const studentID = localStorage.getItem("studentID");
            const response = await fetch(
              "https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/studentImages",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  studentID,
                  studentImage: reader.result
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
  var bloodType = document.getElementById("bloodType");
  var bloodTypeError = document.getElementById("bloodTypeError");

  // src/utils/requests/studentRequests.ts
  async function updateStudentProfile() {
    const studentId = localStorage.getItem("studentID");
    const profileString = localStorage.getItem("profile");
    if (!profileString || !studentId) {
      return;
    }
    const profile = JSON.parse(profileString);
    const { userID } = profile;
    const loadingAnimation = document.getElementById("loadingAnimation");
    loadingAnimation.style.display = "block";
    const studentInfo = {
      firstName: document.getElementById("firstNameInput").value,
      lastName: document.getElementById("lastNameInput").value,
      email: document.getElementById("emailInput").value,
      phone: document.getElementById("phoneInput").value,
      dob: document.getElementById("dobInput").value,
      gender: document.getElementById("genderInput").value,
      ethnicity: document.getElementById("ethnicityInput").value,
      health: document.getElementById("healthInput").value,
      additionalName: document.getElementById("additionalName").value,
      additionalEmail: document.getElementById("additionalEmail").value,
      additionalPhone: document.getElementById("additionalPhone").value,
      emergencyContact: document.getElementById("emergencyContact").value,
      dismissal: document.getElementById("dismissal").value,
      family: document.getElementById("family").value,
      grade: document.getElementById("gradeInput").value,
      school: document.getElementById("schoolInput").value,
      //info: (document.getElementById('infoInput') as HTMLInputElement).value,
      sendTexts: document.getElementById("sendTexts").checked,
      photoRelease: document.getElementById("photoRelease").checked,
      independentTravel: document.getElementById("independentTravel").checked,
      studentID: studentId,
      guardianUserID: userID
      // accountID corresponds to userID in profile object
    };
    try {
      const response = await fetch(
        `https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/student_profiles/${studentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(studentInfo)
        }
      );
      if (!response.ok) {
        const responseData = await response.json();
        const submitError = document.getElementById("submitError");
        if (submitError) {
          if (responseData.message === "Duplicate record detected. Please check your input and try again.") {
            submitError.textContent = "A user with that email already exists. If your student doesn\u2019t have their own email, please leave blank";
          } else {
            submitError.textContent = responseData.message || "An error occurred";
          }
          submitError.style.display = "block";
          loadingAnimation.style.display = "none";
        }
      } else {
        const studentProfile = await response.json();
        const submitError = document.getElementById("submitError");
        submitError.style.display = "none";
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "flex";
        const form = document.getElementById("addStudentContainer");
        form.style.display = "none";
        window.scrollTo(0, 0);
        const studentName = document.getElementById("studentName");
        studentName.textContent = `${studentProfile.studentProfile.firstName} ${studentProfile.studentProfile.lastName}`;
        const studentEmail = document.getElementById("studentEmail");
        studentEmail.textContent = studentProfile.studentProfile.email;
        const studentPhone = document.getElementById("studentPhone");
        studentPhone.textContent = studentProfile.studentProfile.phone;
        const studentImage = document.getElementById("studentImage");
        if (studentProfile.studentProfile.image && studentProfile.studentProfile.image.url) {
          studentImage.src = studentProfile.studentProfile.image.url;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // src/studentProfile.ts
  authenticate();
  function populateForm(response) {
    function setValueIfNotNull(elementId, value) {
      const element = document.getElementById(elementId);
      if (element) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.value = value;
        } else if (element.tagName === "SELECT") {
          const option = Array.from(element.options).find(
            (opt) => opt.value === value
          );
          if (option) {
            option.selected = true;
          }
        }
      }
    }
    setValueIfNotNull("firstNameInput", response.firstName);
    setValueIfNotNull("lastNameInput", response.lastName);
    setValueIfNotNull("phoneInput", response.phone);
    setValueIfNotNull("emailInput", response.email);
    setValueIfNotNull("dobInput", response.dob);
    setValueIfNotNull("schoolInput", response.school);
    setValueIfNotNull("gradeInput", response.grade);
    setValueIfNotNull("genderInput", response.gender);
    setValueIfNotNull("ethnicityInput", response.ethnicity);
    setValueIfNotNull("healthInput", response.health);
    setValueIfNotNull("emergencyContact", response.emergencyContact);
    setValueIfNotNull("dismissal", response.dismissal);
    const checkboxes = ["photoRelease", "independentTravel", "sendTexts"];
    checkboxes.forEach((checkbox) => {
      const checkboxElement = document.getElementById(checkbox);
      if (checkboxElement) {
        checkboxElement.checked = response[checkbox];
      }
    });
    setValueIfNotNull("family", response.family);
    setValueIfNotNull("additionalName", response.additionalName);
    setValueIfNotNull("additionalEmail", response.additionalEmail);
    setValueIfNotNull("additionalPhone", response.additionalPhone);
    const studentNameElement = document.getElementById("studentName");
    if (studentNameElement) {
      const fullName = `${response.firstName} ${response.lastName}`;
      studentNameElement.textContent = fullName;
    }
    const imageElement = document.getElementById("profileImage");
    if (response.image && response.image.url) {
      imageElement.src = response.image.url;
    } else {
      imageElement.src = "https://uploads-ssl.webflow.com/64404db37a2b832b7d5aa9f8/64713ce0d5227bcec70c5505_360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg";
    }
    const additionalCare = document.getElementById("additionalCare");
    const additionalOverflow = document.getElementById("additionalOverflow");
    if (additionalCare && additionalOverflow) {
      additionalCare.checked = !!response.additionalName || !!response.additionalEmail || !!response.additionalPhone;
      additionalOverflow.style.height = additionalCare.checked ? "32rem" : "0";
      additionalCare.addEventListener("click", () => {
        additionalOverflow.style.height = additionalCare.checked ? "32rem" : "0";
      });
    }
    const familyToggle = document.getElementById("familyToggle");
    const familyOverflow = document.getElementById("familyOverflow");
    if (familyToggle && familyOverflow) {
      familyToggle.checked = !!response.family;
      familyOverflow.style.height = familyToggle.checked ? "12rem" : "0";
      familyToggle.addEventListener("click", () => {
        familyOverflow.style.height = familyToggle.checked ? "12rem" : "0";
      });
    }
    if (response.id) {
      localStorage.setItem("studentID", String(response.id));
    }
  }
  window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const airtableID = urlParams.get("student");
    if (airtableID) {
      const apiUrl = `https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/getStudentProfile`;
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ airtableID })
      }).then((response) => response.json()).then((data) => {
        populateForm(data);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    } else {
      console.error("Missing airtableID parameter in the URL");
    }
  });
  var imageUploadInput = document.getElementById("imageUpload");
  uploadStudentImage(imageUploadInput);
  var firstNameInput2 = document.getElementById("firstNameInput");
  if (firstNameInput2)
    firstNameInput2.addEventListener("input", validateFirstName);
  var lastNameInput2 = document.getElementById("lastNameInput");
  if (lastNameInput2)
    lastNameInput2.addEventListener("input", validateLastName);
  var emailInput2 = document.getElementById("emailInput");
  if (emailInput2)
    emailInput2.addEventListener("input", validateEmail);
  var phoneInput2 = document.getElementById("phoneInput");
  if (phoneInput2)
    phoneInput2.addEventListener("input", validatePhone);
  var dobInput2 = document.getElementById("dobInput");
  if (dobInput2)
    dobInput2.addEventListener("input", validateDOB);
  var genderInput2 = document.getElementById("genderInput");
  if (genderInput2)
    genderInput2.addEventListener("input", validateGender);
  var schoolInput2 = document.getElementById("schoolInput");
  if (schoolInput2)
    schoolInput2.addEventListener("input", validateSchool);
  var gradeInput2 = document.getElementById("gradeInput");
  if (gradeInput2)
    gradeInput2.addEventListener("input", validateGrade);
  var ethnicityInput2 = document.getElementById("ethnicityInput");
  if (ethnicityInput2)
    ethnicityInput2.addEventListener("input", validateEthnicity);
  var healthInput2 = document.getElementById("healthInput");
  if (healthInput2)
    healthInput2.addEventListener("input", validateHealth);
  var emergencyInput2 = document.getElementById("emergencyContact");
  if (emergencyInput2)
    emergencyInput2.addEventListener("input", validateEmergency);
  var dismissal2 = document.getElementById("dismissal");
  if (dismissal2)
    dismissal2.addEventListener("input", validateDismissal);
  var additionalEmail2 = document.getElementById("additionalEmail");
  if (additionalEmail2)
    additionalEmail2.addEventListener("input", validateAdditionalEmail);
  var submitButton = document.getElementById("submitButton");
  submitButton?.addEventListener("click", (e) => {
    if (!validateFirstName() || !validateLastName() || !validateEmail() || !validatePhone() || !validateDOB() || !validateGender() || !validateSchool() || !validateGrade() || !validateEthnicity() || !validateHealth() || !validateEmergency() || !validateDismissal() || !validateAdditionalEmail()) {
      e.preventDefault();
      const submitError = document.getElementById("submitError");
      if (submitError) {
        submitError.style.display = "block";
        submitError.textContent = "Please make sure you have entered all fields correctly.";
      }
    } else {
      e.preventDefault();
      updateStudentProfile();
    }
  });
})();
//# sourceMappingURL=studentProfile.js.map
