// Define interface for student profile
interface StudentProfile {
  firstName: string;
  lastName: string;
  id: number;
}

// Array to hold selected students
const studentsSelected: StudentProfile[] = [];

// Variable to hold selected priceID
let priceID: string | null = null;

// Function to fetch student profiles from the server
async function fetchStudentProfiles(guardianUserID: string): Promise<StudentProfile[]> {
  // Send GET request to server to fetch student profiles
  const response = await fetch(
    `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/student_profiles?guardianUserID=${guardianUserID}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  // If the response is not OK, throw an error
  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.message || 'An error occurred');
  }

  // Otherwise, parse the response data and return it
  const responseData: { allStudentProfiles: StudentProfile[] } = await response.json();
  return responseData.allStudentProfiles;
}

// Function to handle the display and interaction of student profiles
async function handleStudentProfiles(): Promise<void> {
  // Get user profile from localStorage
  const profileString = localStorage.getItem('profile');
  const profile = profileString ? JSON.parse(profileString) : null;
  const guardianUserID = profile?.userID;

  // Get loading animation and error message elements
  const loadingAnimation = document.getElementById('loadingAnimation') as HTMLDivElement;
  const registrationFormWrapper = document.getElementById(
    'registrationFormWrapper'
  ) as HTMLDivElement;
  const noStudentProfiles = document.getElementById('NoStudentProfiles') as HTMLDivElement;

  // Hide the registration form and show loading animation
  registrationFormWrapper.style.display = 'none';
  noStudentProfiles.style.display = 'none';
  loadingAnimation.style.display = 'block';

  // Try to fetch student profiles from server
  try {
    const allStudentProfiles = await fetchStudentProfiles(guardianUserID);

    // If student profiles are returned, populate student list
    if (allStudentProfiles.length > 0) {
      const studentList = document.getElementById('studentList') as HTMLDivElement;
      const studentCardTemplate = document.getElementById('studentItem') as HTMLDivElement;

      // Clear previous student cards
      studentList.innerHTML = '';

      // Create student card for each student profile
      allStudentProfiles.forEach((studentProfile) => {
        // Clone student card template
        const clonedTemplate = studentCardTemplate.cloneNode(true) as HTMLDivElement;

        // Get elements for student name and checkbox
        const studentNameElement = clonedTemplate.querySelector('.fs_checkbox-1_label');
        const studentCheckbox = clonedTemplate.querySelector(
          'input[type="checkbox"]'
        ) as HTMLInputElement;

        // Set student name and checkbox value
        if (studentNameElement) {
          studentNameElement.textContent = `${studentProfile.firstName} ${studentProfile.lastName}`;
        }

        // Handle checkbox state changes
        if (studentCheckbox) {
          studentCheckbox.value = studentProfile.id.toString();

          studentCheckbox.addEventListener('change', () => {
            // When checkbox is checked, add student to selected students
            // When checkbox is unchecked, remove student from selected students
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
            // Log the current selected students
            console.log('Selected Student Profiles:', studentsSelected);
          });
        }

        // Append student card to student list
        studentList.appendChild(clonedTemplate);
      });

      // Hide student card template and display student list
      studentCardTemplate.style.display = 'none';
      studentList.style.display = 'grid';

      // Hide loading animation and display the registration form
      loadingAnimation.style.display = 'none';
      registrationFormWrapper.style.display = 'block';
    } else {
      // No student profiles found
      // Hide loading animation and display the "No Student Profiles" message
      loadingAnimation.style.display = 'none';
      noStudentProfiles.style.display = 'block';
      registrationFormWrapper.style.display = 'none';
    }
  } catch (error) {
    // Log error and display error message
    console.error('An error occurred while fetching student profiles:', error);
    alert('An error occurred while fetching student profiles.');
  }
}

// Function to handle the radio buttons for payment type
function handleRadioButtons(): void {
  // Fetch all radio buttons with the name 'paymentType'
  const radioButtons = document.querySelectorAll('input[name="paymentType"]');

  // Add event listener for each radio button
  radioButtons.forEach((radio) => {
    (radio as HTMLInputElement).addEventListener('change', function () {
      if (this.checked) {
        // Get the priceID attribute from the selected radio button and update the variable
        priceID = this.getAttribute('priceid');
        // log the radio buttons value to the console
        console.log(`Selected payment type: ${this.value}`);
        // Log the updated priceID to the console
        console.log(`Updated priceID: ${priceID}`);
        // update hidden input depositOnly value to true if the selected payment type is deposit
        if (this.value === 'Deposit') {
          const depositOnly = document.getElementById('depositOnly') as HTMLInputElement;
          depositOnly.value = 'true';
          const toggleNoOverflow = document.getElementById('toggleNoOverflow') as HTMLDivElement;
          //set height to 16rem
          toggleNoOverflow.style.height = '16rem';
        } else {
          const depositOnly = document.getElementById('depositOnly') as HTMLInputElement;
          depositOnly.value = 'false';
          const toggleNoOverflow = document.getElementById('toggleNoOverflow') as HTMLDivElement;
          //set height to 16rem
          toggleNoOverflow.style.height = '0rem';
        }
      }
    });
  });
}

//import validateInterest
import { validateInterest } from './utils/forms/inputValidation';

// Function to handle the form submission
function handleFormSubmit(): void {
  // Get elements for submit button and error messages
  const submitButton = document.getElementById('submitButton');
  const studentListError = document.getElementById('studentListError');
  const paymentError = document.getElementById('paymentError');
  const submitError = document.getElementById('submitError');
  const requestLoadingAnimation = document.getElementById('requestLoadingAnimation');

  // Add click event listener for submit button
  if (submitButton) {
    submitButton.addEventListener('click', async (event) => {
      // Prevent the default form submission
      event.preventDefault();

      // Initialize an error flag to false
      let errorFlag = false;

      // Hide all error messages initially
      if (studentListError) studentListError.style.display = 'none';
      if (paymentError) paymentError.style.display = 'none';
      if (submitError) submitError.style.display = 'none';

      // Check if any student profile is selected
      if (studentsSelected.length === 0) {
        // If not, display the appropriate error message
        if (studentListError) {
          studentListError.style.display = 'block';
          studentListError.innerText = 'This field is required';
        }
        errorFlag = true;
      }

      // Check if a payment type has been chosen
      if (!priceID) {
        // If not, display the appropriate error message
        if (paymentError) {
          paymentError.style.display = 'block';
          paymentError.innerText = 'This field is required';
        }
        errorFlag = true;
      }

      //validate interest
      const interest = document.getElementById('interestInput') as HTMLInputElement;
      const interestError = document.getElementById('interestError');
      const interestValue = interest.value;
      const interestValid = validateInterest(interestValue);
      if (!interestValid) {
        if (interestError) {
          interestError.style.display = 'block';
          interestError.innerText = 'This field is required';
        } else {
          interestError.style.display = 'none';
        }
        errorFlag = true;
      }

      // If any error was encountered, prevent form submission and show the submit error
      if (errorFlag) {
        if (submitError) submitError.style.display = 'block';
        // Update the error message
        if (submitError) submitError.innerText = 'Please make sure all required fields are filled';
        return; // If there's an error, don't proceed with the submission
      }

      // Fetch user profile from local storage
      const profileString = localStorage.getItem('profile');
      const profile = profileString ? JSON.parse(profileString) : null;
      const userID = profile?.userID;
      const firstName = profile?.firstName;
      const lastName = profile?.lastName;

      // Fetch checkbox values
      const finAidCheckbox = document.getElementById('finAid') as HTMLInputElement;
      const finPlanCheckbox = document.getElementById('finPlan') as HTMLInputElement;

      // Fetch hidden input values
      const contactListIDInput = document.getElementById('contactListID') as HTMLInputElement;
      const sessionIDInput = document.getElementById('sessionID') as HTMLInputElement;
      const followUpEmailInput = document.getElementById('followUpEmailID') as HTMLInputElement;
      const colorInput = document.getElementById('color') as HTMLInputElement;
      const imageURLInput = document.getElementById('imageURL') as HTMLInputElement;
      const programInput = document.getElementById('program') as HTMLInputElement;
      const workshopInput = document.getElementById('workshop') as HTMLInputElement;
      const sessionTimeInput = document.getElementById('sessionTime') as HTMLInputElement;
      const sessionDayInput = document.getElementById('sessionDay') as HTMLInputElement;
      const depositOnlyInput = document.getElementById('depositOnly') as HTMLInputElement;
      const startDateInput = document.getElementById('startDate') as HTMLInputElement;
      const endDateInput = document.getElementById('endDate') as HTMLInputElement;

      // Fetch the selected radio button for payment type
      const paymentTypeRadioButtons = document.querySelectorAll(
        'input[name="paymentType"]:checked'
      );
      const selectedPaymentTypeRadioButton = paymentTypeRadioButtons[0] as HTMLInputElement;
      const unitAmount = selectedPaymentTypeRadioButton
        ? selectedPaymentTypeRadioButton.getAttribute('unitAmount')
        : null;

      // Extract information from selected students and other form inputs
      const studentIDs = studentsSelected.map((student) => student.id); // Extract IDs from the selected students
      const studentNames = studentsSelected.map(
        (student) => `${student.firstName} ${student.lastName}`
      ); // Extract names from the selected students
      const color = colorInput ? colorInput.value : '';
      const imageURL = imageURLInput ? imageURLInput.value : '';
      const program = programInput ? programInput.value : '';
      const workshop = workshopInput ? workshopInput.value : '';
      const sessionTime = sessionTimeInput ? sessionTimeInput.value : '';
      const sessionDay = sessionDayInput ? sessionDayInput.value : '';
      const finAid = finAidCheckbox ? finAidCheckbox.checked : false;
      const finPlan = finPlanCheckbox ? finPlanCheckbox.checked : false;
      const depositOnly = depositOnlyInput ? depositOnlyInput.value : 'false';
      const emailFollowUpID = followUpEmailInput ? followUpEmailInput.value : '';
      const sessionID = sessionIDInput ? sessionIDInput.value : '';
      const contactListID = contactListIDInput ? contactListIDInput.value : '';
      const startDate = startDateInput ? startDateInput.value : '';
      const endDate = endDateInput ? endDateInput.value : '';

      //remove any empty strings from the contactListID array
      const contactLists = contactListID
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item);
      // Show the request loading animation
      if (requestLoadingAnimation) requestLoadingAnimation.style.display = 'block';

      try {
        // Make a POST request to your endpoint with the form data
        const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/cart_items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
          }),
        });

        if (response.ok) {
          // Hide the request loading animation
          if (requestLoadingAnimation) requestLoadingAnimation.style.display = 'none';

          // Redirect the user to the next page
          window.location.href = '/my-account/cart';
        } else {
          throw new Error('An error occurred while submitting the form');
        }
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error(error);

        // Hide the request loading animation
        if (requestLoadingAnimation) requestLoadingAnimation.style.display = 'none';

        // Display the submit error message
        if (submitError) submitError.style.display = 'block';
      }
    });
  }
}

// Function to handle the Free form submission
function handleFreeFormSubmit(): void {
  const freeSubmitButton = document.getElementById('freeSubmitButton');
  const studentListError = document.getElementById('studentListError');
  const submitError = document.getElementById('submitError');
  const freeRequestLoadingAnimation = document.getElementById('freeRequestLoadingAnimation');

  if (freeSubmitButton) {
    freeSubmitButton.addEventListener('click', async (event) => {
      event.preventDefault();

      let errorFlag = false;

      if (studentListError) {
        studentListError.style.display = 'none';
      }
      if (submitError) {
        submitError.style.display = 'none';
      }

      if (studentsSelected.length === 0) {
        if (studentListError) {
          studentListError.style.display = 'block';
          studentListError.innerText = 'This field is required';
        }
        errorFlag = true;
      }

      if (errorFlag) {
        if (submitError) {
          submitError.style.display = 'block';
          submitError.innerText = 'Please make sure all required fields are filled';
        }
        return;
      }

      const profileString = localStorage.getItem('profile');
      const profile = profileString ? JSON.parse(profileString) : null;
      const userID = profile?.userID;
      const firstName = profile?.firstName;
      const lastName = profile?.lastName;

      const contactListIDInput = document.getElementById('contactListID') as HTMLInputElement;
      const sessionIDInput = document.getElementById('sessionID') as HTMLInputElement;
      const followUpEmailInput = document.getElementById('followUpEmailID') as HTMLInputElement;
      const colorInput = document.getElementById('color') as HTMLInputElement;
      const imageURLInput = document.getElementById('imageURL') as HTMLInputElement;
      const programInput = document.getElementById('program') as HTMLInputElement;
      const workshopInput = document.getElementById('workshop') as HTMLInputElement;
      const sessionTimeInput = document.getElementById('sessionTime') as HTMLInputElement;
      const sessionDayInput = document.getElementById('sessionDay') as HTMLInputElement;
      const startDateInput = document.getElementById('startDate') as HTMLInputElement;
      const endDateInput = document.getElementById('endDate') as HTMLInputElement;

      const studentIDs = studentsSelected.map((student) => student.id);
      const studentNames = studentsSelected.map(
        (student) => `${student.firstName} ${student.lastName}`
      );
      const color = colorInput ? colorInput.value : '';
      const imageURL = imageURLInput ? imageURLInput.value : '';
      const program = programInput ? programInput.value : '';
      const workshop = workshopInput ? workshopInput.value : '';
      const sessionTime = sessionTimeInput ? sessionTimeInput.value : '';
      const sessionDay = sessionDayInput ? sessionDayInput.value : '';
      const emailFollowUpID = followUpEmailInput ? followUpEmailInput.value : '';
      const sessionID = sessionIDInput ? sessionIDInput.value : '';
      const contactListID = contactListIDInput ? contactListIDInput.value : '';
      const startDate = startDateInput ? startDateInput.value : '';
      const endDate = endDateInput ? endDateInput.value : '';

      const contactLists = contactListID
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

      if (freeRequestLoadingAnimation) {
        freeRequestLoadingAnimation.style.display = 'block';
      }

      try {
        const response = await fetch(
          'https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/FREE_REGISTRATION',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
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
            }),
          }
        );

        if (response.ok) {
          window.location.href = '/successful-checkout';
        } else {
          throw new Error('An error occurred while submitting the form');
        }
      } catch (error) {
        console.error(error);
        if (submitError) {
          submitError.style.display = 'block';
        }
      } finally {
        if (freeRequestLoadingAnimation) {
          freeRequestLoadingAnimation.style.display = 'none';
        }
      }
    });
  }
}

// Wait for the DOM content to load before running the functions
document.addEventListener('DOMContentLoaded', function () {
  const notLoggedInElement = document.getElementById('NotLoggedIn');
  const registrationFormWrapper = document.getElementById('registrationFormWrapper');
  const loadingAnimation = document.getElementById('loadingAnimation');

  if (localStorage.getItem('profile') === null) {
    // User is not logged in
    if (notLoggedInElement) {
      notLoggedInElement.style.display = 'block';
    }
    if (registrationFormWrapper) {
      registrationFormWrapper.style.display = 'none';
      loadingAnimation.style.display = 'none';
    }
  } else {
    // User is logged in
    if (notLoggedInElement) {
      notLoggedInElement.style.display = 'none';
    }
    if (registrationFormWrapper) {
      registrationFormWrapper.style.display = 'block';
      handleStudentProfiles();
    }
  }

  //if finAid or finPlan is checked, select deposit radio button
  const finAidCheckbox = document.getElementById('finAid') as HTMLInputElement;
  const finPlanCheckbox = document.getElementById('finPlan') as HTMLInputElement;

  // get radio buttons by value
  const depositRadioButton = document.querySelector(
    'input[name="paymentType"][value="Deposit"]'
  ) as HTMLInputElement;

  // Get other radio buttons by their values (adjust these selectors according to your HTML)
  const otherRadioButtons = Array.from(
    document.querySelectorAll('input[name="paymentType"]:not([value="Deposit"])')
  ) as HTMLInputElement[];

  // if finAid or finPlan are checked, auto click deposit radio button
  if (finAidCheckbox) {
    finAidCheckbox.addEventListener('change', () => {
      if (finAidCheckbox.checked || (finPlanCheckbox && finPlanCheckbox.checked)) {
        depositRadioButton.click();
      }
    });
  }

  if (finPlanCheckbox) {
    finPlanCheckbox.addEventListener('change', () => {
      if (finPlanCheckbox.checked || (finAidCheckbox && finAidCheckbox.checked)) {
        depositRadioButton.click();
      }
    });
  }

  // If other payment options are selected, uncheck finAid and finPlan
  otherRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', () => {
      if (radioButton.checked) {
        if (finAidCheckbox) finAidCheckbox.checked = false;
        if (finPlanCheckbox) finPlanCheckbox.checked = false;
      }
    });
  });

  handleRadioButtons();
  handleFormSubmit();
  handleFreeFormSubmit();

  //if finAid is checked change #finAidText to 'Yes'
  const finAidText = document.getElementById('finAidText');
  if (finAidCheckbox) {
    finAidCheckbox.addEventListener('change', () => {
      if (finAidCheckbox.checked) {
        finAidText.innerText = 'Yes';
      } else {
        finAidText.innerText = 'No';
      }
    });
  }

  //if finPlan is checked change #finPlanText to 'Yes'
  const finPlanText = document.getElementById('finPlanText');
  if (finPlanCheckbox) {
    finPlanCheckbox.addEventListener('change', () => {
      if (finPlanCheckbox.checked) {
        finPlanText.innerText = 'Yes';
      } else {
        finPlanText.innerText = 'No';
      }
    });
  }
});

//if the button with id 'addStudent' is clicked set redirectURL in localStorage and redirect to current page
const addStudentButton = document.getElementById('addStudent');
if (addStudentButton) {
  addStudentButton.addEventListener('click', () => {
    localStorage.setItem('redirectURL', window.location.href);
    window.location.href = '/create-account/add-student';
  });
}
