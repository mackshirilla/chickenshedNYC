// Fill the form and the code will validate if everything is perfect. Press run to try again.
if ($('#firstNameInput').val() === '') {
  $('#firstNameError').css('display', 'flex');
  $('#firstNameError').text('First Name Required');
} else if ($('#lastNameInput').val() === '') {
  $('#lastNameError').css('display', 'flex');
  $('#lastNameError').text('Last Name Required');
} else if ($('#emailInput').val() === '') {
  $('#emailError').css('display', 'flex');
  $('#emailError').text('Email Required');
} else {
  $('#submitMessage').css('display', 'flex');
  $('#submitMessage').text('All good!');
}
