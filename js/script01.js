function sendMail() {
  let parms = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  };
  emailjs
    .send('service_g4x0db9', 'template_zimlcbk', parms)
    .then(alert('Email Sent!!'));
}
