// listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  //  get value
  var name = getInputVal('name');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var subject = getInputVal('subject');
  var message = getInputVal('message');

  console.log(name);
}

// Function to get form value
function getInputVal(id) {
  return document.getElementById(id).value;
}
