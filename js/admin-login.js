import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyB6h-jvp3vMYRX8kNllCAkur_faZODOqcs',
  authDomain: 'lakbaypinas-ec16f.firebaseapp.com',
  projectId: 'lakbaypinas-ec16f',
  storageBucket: 'lakbaypinas-ec16f.firebasestorage.app',
  messagingSenderId: '646279681470',
  appId: '1:646279681470:web:ab8a9248560559f62a55ef',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('adminLoginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailField = document.getElementById('adminEmail');
  const passwordField = document.getElementById('adminPassword');

  const email = emailField.value;
  const password = passwordField.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // Refresh token to read new claims
      const tokenResult = await user.getIdTokenResult(true);

      if (tokenResult.claims.admin === true) {
        alert('Admin login successful!');

        // Clear input fields
        emailField.value = '';
        passwordField.value = '';

        // Redirect to admin page
        window.location.href = '../admin/admin-messages.html';
      } else {
        alert('⛔ This account is NOT an admin.');
        auth.signOut();

        // Clear input fields
        emailField.value = '';
        passwordField.value = '';
      }
    })
    .catch((error) => {
      alert(error.message);

      // Clear input fields
      emailField.value = '';
      passwordField.value = '';
    });
});

// import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
// } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

// const firebaseConfig = {
//   apiKey: 'AIzaSyB6h-jvp3vMYRX8kNllCAkur_faZODOqcs',
//   authDomain: 'lakbaypinas-ec16f.firebaseapp.com',
//   projectId: 'lakbaypinas-ec16f',
//   storageBucket: 'lakbaypinas-ec16f.firebasestorage.app',
//   messagingSenderId: '646279681470',
//   appId: '1:646279681470:web:ab8a9248560559f62a55ef',
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const loginForm = document.getElementById('adminLoginForm');

// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   // LOGIN FIRST
//   signInWithEmailAndPassword(auth, email, password)
//     .then(async (userCredential) => {
//       const user = userCredential.user;

//       // 🔥 FORCE REFRESH THE TOKEN TO READ NEW CLAIMS
//       const tokenResult = await user.getIdTokenResult(true);

//       if (tokenResult.claims.admin === true) {
//         alert('Admin login successful!');
//         window.location.href = '../admin/admin-messages.html';
//       } else {
//         alert('⛔ This account is NOT an admin.');
//         auth.signOut();
//       }
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// });

// import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
// } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

// const firebaseConfig = {
//   apiKey: 'AIzaSyB6h-jvp3vMYRX8kNllCAkur_faZODOqcs',
//   authDomain: 'lakbaypinas-ec16f.firebaseapp.com',
//   projectId: 'lakbaypinas-ec16f',
//   storageBucket: 'lakbaypinas-ec16f.firebasestorage.app',
//   messagingSenderId: '646279681470',
//   appId: '1:646279681470:web:ab8a9248560559f62a55ef',
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const loginForm = document.getElementById('adminLoginForm');

// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       alert('Login successful!');
//       window.location.href = '../admin/admin-messages.html';
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// });
