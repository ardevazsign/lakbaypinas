// --------------------------------------------------
// IMPORT FIREBASE
// --------------------------------------------------
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN ELEMENTS
const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

// LOGIN EVENT
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('Login successful!');
      loginForm.reset();
      window.location.href = 'index.html';
    })
    .catch((error) => {
      alert(error.message);
    });
});

document.addEventListener('click', (e) => {
  if (e.target.id === 'openModalLogin') {
    loginForm.reset();
  }
});
