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

  // src/utils/requests/guardianRequests.ts
  function getGuardianProfile() {
    const profileString = localStorage.getItem("profile");
    if (!profileString) {
      return Promise.reject(new Error("Profile not found in localStorage"));
    }
    const profile = JSON.parse(profileString);
    const guardianId = profile.id;
    if (!guardianId) {
      return Promise.reject(new Error("Guardian ID not found in profile"));
    }
    const url = `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/guardians/${guardianId}`;
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }).then((data) => {
      const firstNameInput3 = document.getElementById("firstNameInput");
      firstNameInput3.value = data.firstName ?? "";
      const lastNameInput3 = document.getElementById("lastNameInput");
      lastNameInput3.value = data.lastName ?? "";
      const phoneInput3 = document.getElementById("phoneInput");
      phoneInput3.value = data.phoneNumber ?? "";
      const emailInput3 = document.getElementById("emailInput");
      emailInput3.value = data.email ?? "";
      const sendTextsCheckbox = document.getElementById("sendTexts");
      sendTextsCheckbox.checked = data.sendTexts ?? false;
      const yMemberCheckbox = document.getElementById("yMember");
      yMemberCheckbox.checked = data.yMembership !== void 0 && data.yMembership !== "";
      const membershipNumberInput = document.getElementById("membershipNumber");
      membershipNumberInput.value = data.yMembership ?? "";
      const profileImage = document.getElementById("profileImage");
      profileImage.src = data.image?.url ?? "https://assets.website-files.com/64404db37a2b832b7d5aa9f8/64404db37a2b831d465aaa01_image.svg";
      profileImage.alt = `${data.firstName ?? ""} ${data.lastName ?? ""}'s profile picture`;
      return data;
    }).catch((error) => {
      console.error("Error:", error);
      throw error;
    });
  }
  async function updateGuardianProfile() {
    const profileString = localStorage.getItem("profile");
    const profile = profileString ? JSON.parse(profileString) : null;
    const guardianID = profile ? profile.id : null;
    if (!guardianID) {
      return;
    }
    const loadingAnimation = document.getElementById("loadingAnimation");
    const firstNameInput3 = document.getElementById("firstNameInput");
    const lastNameInput3 = document.getElementById("lastNameInput");
    const emailInput3 = document.getElementById("emailInput");
    const phoneInput3 = document.getElementById("phoneInput");
    const sendTexts = document.getElementById("sendTexts");
    const yMember = document.getElementById("yMember");
    const membershipNumber = document.getElementById("membershipNumber");
    if (loadingAnimation && firstNameInput3 && lastNameInput3 && emailInput3 && phoneInput3 && sendTexts && yMember && membershipNumber) {
      loadingAnimation.style.display = "block";
      const guardianInfo = {
        firstName: firstNameInput3.value,
        lastName: lastNameInput3.value,
        email: emailInput3.value,
        phone: phoneInput3.value,
        sendTexts: sendTexts.checked,
        isYMember: yMember.checked,
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
          window.location.reload();
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

  // src/utils/requests/studentRequests.ts
  async function getStudentsDashboard() {
    const profileString = localStorage.getItem("profile");
    const profile = profileString ? JSON.parse(profileString) : null;
    const guardianUserID = profile ? profile.userID : null;
    if (!guardianUserID) {
      return;
    }
    const loadingAnimation = document.getElementById("loadingAnimation");
    const studentList = document.getElementById("studentList");
    const noStudents = document.getElementById("noStudents");
    try {
      loadingAnimation.style.display = "block";
      const response = await fetch(
        `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/student_profiles?guardianUserID=${guardianUserID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (!response.ok) {
        const responseData = await response.json();
        alert(responseData.message || "An error occurred");
      } else {
        const responseData = await response.json();
        if (responseData.allStudentProfiles.length > 0) {
          studentList.innerHTML = "";
          const studentCardTemplate = document.getElementById("studentCard");
          responseData.allStudentProfiles.forEach((studentProfile) => {
            const clonedTemplate = studentCardTemplate.cloneNode(true);
            const studentNameElement = clonedTemplate.querySelector("#studentNameList");
            const studentEmailElement = clonedTemplate.querySelector("#studentEmailList");
            const studentPhoneElement = clonedTemplate.querySelector("#studentPhoneList");
            const studentImageElement = clonedTemplate.querySelector(
              "#studentImageList"
            );
            if (studentNameElement)
              studentNameElement.textContent = studentProfile.firstName + " " + studentProfile.lastName;
            if (studentEmailElement)
              studentEmailElement.textContent = studentProfile.email;
            if (studentPhoneElement)
              studentPhoneElement.textContent = studentProfile.phone;
            if (studentImageElement && studentProfile.image) {
              studentImageElement.src = studentProfile.image.url;
            }
            clonedTemplate.href = `/my-account/student-profile?profile=${studentProfile.airtableID}`;
            studentList.append(clonedTemplate);
          });
          studentCardTemplate.style.display = "none";
          studentList.style.display = "grid";
          noStudents.style.display = "none";
        } else {
          studentList.style.display = "none";
          noStudents.style.display = "flex";
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      loadingAnimation.style.display = "none";
    }
  }

  // src/utils/requests/getTicketOrders.ts
  function getTicketOrder() {
    const profileJSON = localStorage.getItem("profile");
    if (!profileJSON) {
      console.error("Profile object not found in localStorage.");
      return;
    }
    const profile = JSON.parse(profileJSON);
    const { airtableID } = profile;
    if (!airtableID) {
      console.error("Airtable ID not found in profile.");
      return;
    }
    const queryParams = new URLSearchParams({
      userAirtableID: airtableID
    });
    const url = `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/Ticket_Orders?${queryParams}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((data) => {
      console.log("Response:", data);
      if (!data.response || !data.response.result || !data.response.result.records) {
        console.error("Unable to find ticket order records in the response.");
        return;
      }
      const { records } = data.response.result;
      const ticketListContainer = document.getElementById("ticketList");
      if (ticketListContainer) {
        ticketListContainer.innerHTML = "";
        if (records.length === 0) {
          const noTicketsElement = document.getElementById("noTickets");
          if (noTicketsElement) {
            noTicketsElement.style.display = "flex";
          }
        } else {
          const noTicketsElement = document.getElementById("noTickets");
          if (noTicketsElement) {
            noTicketsElement.style.display = "none";
          }
          records.forEach((record) => {
            const ticketOrderElement = document.createElement("a");
            ticketOrderElement.href = `/tickets/ticket-order?order=${record.fields.orderNumber}`;
            ticketOrderElement.setAttribute("data-w-id", "6f59b974-64ae-1e7f-09cb-d5a59bc81f77");
            ticketOrderElement.className = "student_card w-inline-block";
            const studentDetailsElement = document.createElement("div");
            studentDetailsElement.className = "student_details";
            studentDetailsElement.setAttribute("w-el", "studentCard");
            const performanceNameElement = document.createElement("div");
            performanceNameElement.id = "performanceName";
            performanceNameElement.className = "heading-style-h6";
            performanceNameElement.textContent = record.fields.performanceName;
            const performanceDateElement = document.createElement("div");
            performanceDateElement.id = "performanceDate";
            performanceDateElement.className = "text-weight-light text-size-small";
            performanceDateElement.textContent = formatFriendlyDate(record.fields.performanceDate);
            const performanceTimeElement = document.createElement("div");
            performanceTimeElement.id = "performanceTime";
            performanceTimeElement.className = "text-weight-light text-size-small";
            performanceTimeElement.textContent = record.fields.performanceTime;
            studentDetailsElement.appendChild(performanceNameElement);
            studentDetailsElement.appendChild(performanceDateElement);
            studentDetailsElement.appendChild(performanceTimeElement);
            ticketOrderElement.appendChild(studentDetailsElement);
            ticketListContainer.appendChild(ticketOrderElement);
          });
        }
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  }
  function formatFriendlyDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
      // Set the time zone to UTC
    };
    return new Date(dateString).toLocaleDateString(void 0, options);
  }

  // src/my-account.ts
  authenticate();
  var toggleSwitches = document.querySelectorAll(
    '.switch input[type="checkbox"]'
  );
  toggleSwitches.forEach(function(switchInput) {
    switchInput.addEventListener("click", function() {
      const parentNode = this.parentNode;
      parentNode.classList.toggle("checked");
      const toggleText = parentNode.querySelector(".toggle-text");
      if (toggleText) {
        if (this.checked) {
          toggleText.textContent = "Yes";
        } else {
          toggleText.textContent = "No";
        }
      }
    });
    switchInput.click();
  });
  getGuardianProfile().then(() => {
    const yMemberToggle = document.querySelector("#yMember");
    if (yMemberToggle?.checked) {
      setDisplayYInputHeight("7rem");
    } else {
      setDisplayYInputHeight("0rem");
    }
    yMemberToggle?.addEventListener("change", function() {
      if (this.checked) {
        setDisplayYInputHeight("7rem");
      } else {
        setDisplayYInputHeight("0rem");
      }
    });
  }).catch((error) => {
    console.error(error);
  });
  function setDisplayYInputHeight(height) {
    const displayYInput = document.querySelector("#displayYInput");
    if (displayYInput) {
      displayYInput.style.height = height;
    }
  }
  var imageUploadInput = document.getElementById("imageUpload");
  uploadGuardianImage(imageUploadInput);
  var phoneInput2 = document.getElementById("phoneInput");
  if (phoneInput2)
    phoneInput2.addEventListener("input", validatePhone);
  var firstNameInput2 = document.getElementById("firstNameInput");
  if (firstNameInput2)
    firstNameInput2.addEventListener("input", validateFirstName);
  var lastNameInput2 = document.getElementById("lastNameInput");
  if (lastNameInput2)
    lastNameInput2.addEventListener("input", validateLastName);
  var emailInput2 = document.getElementById("emailInput");
  if (emailInput2)
    emailInput2.addEventListener("input", validateEmail);
  var submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", (e) => {
    if (!validatePhone()) {
      e.preventDefault();
      const submitError = document.getElementById("submitError");
      submitError.style.display = "block";
      submitError.textContent = "Please make sure you have entered all fields correctly.";
    } else {
      e.preventDefault();
      updateGuardianProfile();
    }
  });
  getStudentsDashboard();
  getTicketOrder();
})();
//# sourceMappingURL=my-account.js.map
