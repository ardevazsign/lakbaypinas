// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyB6h-jvp3vMYRX8kNllCAkur_faZODOqcs',
  authDomain: 'lakbaypinas-ec16f.firebaseapp.com',
  projectId: 'lakbaypinas-ec16f',
  storageBucket: 'lakbaypinas-ec16f.firebasestorage.app',
  messagingSenderId: '646279681470',
  appId: '1:646279681470:web:ab8a9248560559f62a55ef',
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// REGISTER ELEMENTS
const registerForm = document.getElementById('registerForm');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');

// --------------------------------------------------
// REGISTER FUNCTION
// --------------------------------------------------
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = registerEmail.value;
  const password = registerPassword.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('Account created successfully!');
      registerForm.reset();
    })
    .catch((error) => {
      alert(error.message);
    });
});

document.addEventListener('click', (e) => {
  if (e.target.id === 'openModalLogin') {
    registerForm.reset();
  }
});
