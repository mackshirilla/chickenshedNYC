// Define the interface for the Student Profile
interface StudentProfile {
  firstName: string;
  lastName: string;
  id: number;
}

// Function to fetch student profiles from the server
async function fetchStudentProfiles(guardianUserID: string): Promise<StudentProfile[]> {
  const response = await fetch(
    `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/student_profiles?guardianUserID=${guardianUserID}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.message || 'An error occurred');
  }

  const responseData: { allStudentProfiles: StudentProfile[] } = await response.json();
  return responseData.allStudentProfiles;
}

// Function to handle the display and interaction of student profiles
async function handleStudentProfiles(): Promise<void> {
  const profileString = localStorage.getItem('profile');
  const profile = profileString ? JSON.parse(profileString) : null;
  const guardianUserID = profile?.userID;

  if (!guardianUserID) {
    console.error('Guardian UserID not found in localStorage');
    return;
  }

  const loadingAnimation = document.getElementById('listLoadingAnimation') as HTMLDivElement;

  try {
    loadingAnimation.style.display = 'block';
    const allStudentProfiles = await fetchStudentProfiles(guardianUserID);
    const studentsSelected: number[] = [];

    if (allStudentProfiles.length > 0) {
      const studentList = document.getElementById('studentList') as HTMLDivElement;
      const studentCardTemplate = document.getElementById('studentItem') as HTMLDivElement;

      studentList.innerHTML = ''; // Clear previous student cards

      allStudentProfiles.forEach((studentProfile) => {
        const clonedTemplate = studentCardTemplate.cloneNode(true) as HTMLDivElement;
        const studentNameElement = clonedTemplate.querySelector('.fs_checkbox-1_label');
        const studentCheckbox = clonedTemplate.querySelector(
          'input[type="checkbox"]'
        ) as HTMLInputElement;

        if (studentNameElement) {
          studentNameElement.textContent = `${studentProfile.firstName} ${studentProfile.lastName}`;
        }

        if (studentCheckbox) {
          studentCheckbox.value = studentProfile.id.toString();

          studentCheckbox.addEventListener('change', () => {
            if (studentCheckbox.checked) {
              studentsSelected.push(studentProfile.id);
            } else {
              const index = studentsSelected.indexOf(studentProfile.id);
              if (index !== -1) {
                studentsSelected.splice(index, 1);
              }
            }
            console.log('Selected Student IDs:', studentsSelected);
          });
        }

        studentList.appendChild(clonedTemplate);
      });

      studentCardTemplate.style.display = 'none';
      studentList.style.display = 'grid';
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while fetching student profiles.');
  } finally {
    loadingAnimation.style.display = 'none';
  }
}

// Wait for the DOM content to load before running the function
document.addEventListener('DOMContentLoaded', function () {
  handleStudentProfiles();
});
