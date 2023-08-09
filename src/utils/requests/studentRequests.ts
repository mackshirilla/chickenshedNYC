//addStudentPageLoad - From Guardian Account
export async function addStudentOnLoad() {
  try {
    const response = await fetch(
      'https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/student_profiles',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Process the response
    if (!response.ok) {
      const responseData = await response.json();
      const submitError = document.getElementById('submitError') as HTMLDivElement;
      // If error display the message
      if (submitError) {
        submitError.style.display = 'block';
        submitError.textContent = responseData.message || 'An error occurred';
      }
    } else {
      //save studentID to variable
      const responseData = await response.json();
      localStorage.setItem('studentID', responseData.id);
      //console.log(responseData);
    }
  } catch (error) {
    console.error(error);
  } finally {
  }
}

// get all Student Profiles FOR CARDS From Guardian Account
export async function getStudentProfiles() {
  const profileString = localStorage.getItem('profile');
  const profile = profileString ? JSON.parse(profileString) : null;
  const guardianUserID = profile ? profile.userID : null;
  interface StudentProfile {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image: { url: string };
  }

  if (!guardianUserID) {
    // Handle the case when userID is not found in localStorage
    return;
  }

  const loadingAnimation = document.getElementById('loadingAnimation') as HTMLDivElement;

  try {
    loadingAnimation.style.display = 'block';

    const response = await fetch(
      `https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/student_profiles?guardianUserID=${guardianUserID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      alert(responseData.message || 'An error occurred');
    } else {
      const responseData: { allStudentProfiles: StudentProfile[] } = await response.json();
      if (responseData.allStudentProfiles.length > 0) {
        const studentList = document.getElementById('studentList') as HTMLDivElement;
        const studentCardTemplate = document.getElementById('studentCard') as HTMLDivElement;
        const studentListWrapper = document.getElementById('studentListWrapper') as HTMLDivElement;

        // For each student profile, clone the template, fill in the data and append to the list
        responseData.allStudentProfiles.forEach((studentProfile) => {
          const clonedTemplate = studentCardTemplate.cloneNode(true) as HTMLDivElement;
          const studentNameElement = clonedTemplate.querySelector('#studentNameList');
          const studentEmailElement = clonedTemplate.querySelector('#studentEmailList');
          const studentPhoneElement = clonedTemplate.querySelector('#studentPhoneList');
          const studentImageElement = clonedTemplate.querySelector(
            '#studentImageList'
          ) as HTMLImageElement;

          if (studentNameElement)
            studentNameElement.textContent =
              studentProfile.firstName + ' ' + studentProfile.lastName;
          if (studentEmailElement) studentEmailElement.textContent = studentProfile.email;
          if (studentPhoneElement) studentPhoneElement.textContent = studentProfile.phone;
          if (studentImageElement && studentProfile.image) {
            studentImageElement.src = studentProfile.image.url;
          }
          studentList.append(clonedTemplate);
        });

        studentCardTemplate.style.display = 'none';
        studentList.style.display = 'block';

        setTimeout(() => {
          studentListWrapper.style.width = '28rem';
        }, 0); // start as soon as possible
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    loadingAnimation.style.display = 'none';
  }
}

// Update Student Profile - From Guardian account
export async function updateStudentProfile() {
  const studentId = localStorage.getItem('studentID');

  const profileString = localStorage.getItem('profile');
  if (!profileString || !studentId) {
    // Handle the case when studentId or profile is not found in localStorage
    return;
  }

  const profile = JSON.parse(profileString);
  const { userID } = profile;

  const loadingAnimation = document.getElementById('loadingAnimation') as HTMLDivElement;
  loadingAnimation.style.display = 'block';

  const studentInfo = {
    firstName: (document.getElementById('firstNameInput') as HTMLInputElement).value,
    lastName: (document.getElementById('lastNameInput') as HTMLInputElement).value,
    email: (document.getElementById('emailInput') as HTMLInputElement).value,
    phone: (document.getElementById('phoneInput') as HTMLInputElement).value,
    dob: (document.getElementById('dobInput') as HTMLInputElement).value,
    gender: (document.getElementById('genderInput') as HTMLInputElement).value,
    ethnicity: (document.getElementById('ethnicityInput') as HTMLInputElement).value,
    health: (document.getElementById('healthInput') as HTMLInputElement).value,
    additionalName: (document.getElementById('additionalName') as HTMLInputElement).value,
    additionalEmail: (document.getElementById('additionalEmail') as HTMLInputElement).value,
    additionalPhone: (document.getElementById('additionalPhone') as HTMLInputElement).value,
    emergencyContact: (document.getElementById('emergencyContact') as HTMLInputElement).value,
    dismissal: (document.getElementById('dismissal') as HTMLInputElement).value,
    family: (document.getElementById('family') as HTMLInputElement).value,
    grade: (document.getElementById('gradeInput') as HTMLInputElement).value,
    school: (document.getElementById('schoolInput') as HTMLInputElement).value,
    //info: (document.getElementById('infoInput') as HTMLInputElement).value,
    sendTexts: (document.getElementById('sendTexts') as HTMLInputElement).checked,
    photoRelease: (document.getElementById('photoRelease') as HTMLInputElement).checked,
    independentTravel: (document.getElementById('independentTravel') as HTMLInputElement).checked,
    studentID: studentId,
    guardianUserID: userID, // accountID corresponds to userID in profile object
  };

  try {
    const response = await fetch(
      `https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/student_profiles/${studentId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentInfo),
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      const submitError = document.getElementById('submitError') as HTMLDivElement;

      if (submitError) {
        if (
          responseData.message ===
          'Duplicate record detected. Please check your input and try again.'
        ) {
          submitError.textContent =
            'A user with that email already exists. If your student doesn’t have their own email, please leave blank';
        } else {
          submitError.textContent = responseData.message || 'An error occurred';
        }
        // Show the error message
        submitError.style.display = 'block';
        loadingAnimation.style.display = 'none';
      }
    } else {
      const studentProfile = await response.json();
      // hide error message
      const submitError = document.getElementById('submitError') as HTMLDivElement;
      submitError.style.display = 'none';
      // display success message
      const successMessage = document.getElementById('successMessage') as HTMLDivElement;
      successMessage.style.display = 'flex';
      //hide form
      const form = document.getElementById('addStudentContainer') as HTMLFormElement;
      form.style.display = 'none';
      //scroll to top of page automatically
      window.scrollTo(0, 0);
      //console.log(studentProfile);
      const studentName = document.getElementById('studentName') as HTMLDivElement;
      studentName.textContent = `${studentProfile.studentProfile.firstName} ${studentProfile.studentProfile.lastName}`;

      const studentEmail = document.getElementById('studentEmail') as HTMLDivElement;
      studentEmail.textContent = studentProfile.studentProfile.email;

      const studentPhone = document.getElementById('studentPhone') as HTMLDivElement;
      studentPhone.textContent = studentProfile.studentProfile.phone;

      const studentImage = document.getElementById('studentImage') as HTMLImageElement;
      if (studentProfile.studentProfile.image && studentProfile.studentProfile.image.url) {
        studentImage.src = studentProfile.studentProfile.image.url;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// Student Dashboard Request
export async function getStudentsDashboard() {
  const profileString = localStorage.getItem('profile');
  const profile = profileString ? JSON.parse(profileString) : null;
  const guardianUserID = profile ? profile.userID : null;

  interface StudentProfile {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image: { url: string };
    airtableID: string;
  }

  if (!guardianUserID) {
    // Handle the case when userID is not found in localStorage
    return;
  }

  const loadingAnimation = document.getElementById('loadingAnimation') as HTMLDivElement;
  const studentList = document.getElementById('studentList') as HTMLDivElement;
  const noStudents = document.getElementById('noStudents') as HTMLDivElement;

  try {
    loadingAnimation.style.display = 'block';

    const response = await fetch(
      `https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/student_profiles?guardianUserID=${guardianUserID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      alert(responseData.message || 'An error occurred');
    } else {
      const responseData: { allStudentProfiles: StudentProfile[] } = await response.json();
      if (responseData.allStudentProfiles.length > 0) {
        // Clear the studentList
        studentList.innerHTML = '';

        const studentCardTemplate = document.getElementById('studentCard') as HTMLAnchorElement;

        // For each student profile, clone the template, fill in the data and append to the list
        responseData.allStudentProfiles.forEach((studentProfile) => {
          const clonedTemplate = studentCardTemplate.cloneNode(true) as HTMLAnchorElement;
          const studentNameElement = clonedTemplate.querySelector('#studentNameList');
          const studentEmailElement = clonedTemplate.querySelector('#studentEmailList');
          const studentPhoneElement = clonedTemplate.querySelector('#studentPhoneList');
          const studentImageElement = clonedTemplate.querySelector(
            '#studentImageList'
          ) as HTMLImageElement;

          if (studentNameElement)
            studentNameElement.textContent =
              studentProfile.firstName + ' ' + studentProfile.lastName;
          if (studentEmailElement) studentEmailElement.textContent = studentProfile.email;
          if (studentPhoneElement) studentPhoneElement.textContent = studentProfile.phone;
          if (studentImageElement && studentProfile.image) {
            studentImageElement.src = studentProfile.image.url;
          }

          // Update the link's href attribute with the student's airtableID
          clonedTemplate.href = `/my-account/student-profile?student=${studentProfile.airtableID}`;

          studentList.append(clonedTemplate);
        });

        studentCardTemplate.style.display = 'none';
        studentList.style.display = 'grid';
        noStudents.style.display = 'none';
      } else {
        // If no student profiles found, hide the studentList and display the #noStudents div
        studentList.style.display = 'none';
        noStudents.style.display = 'flex';
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    loadingAnimation.style.display = 'none';
  }
}
