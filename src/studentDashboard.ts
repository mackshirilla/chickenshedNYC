// import fetchFiles from './utils/requests/getFiles';
import { fetchFiles } from './utils/requests/getFiles';
fetchFiles();

//set #studentName to be the the value of firstName in the profile object in local storage
const studentName = document.querySelector('#studentName');
const profile = JSON.parse(localStorage.getItem('profile'));
studentName.innerHTML = profile.firstName;
