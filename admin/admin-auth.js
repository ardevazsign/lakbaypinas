import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
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

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Not logged in → redirect to admin login page
    window.location.href = '../admin-login/admin-login.html';
    return;
  }

  // Check admin claim
  const token = await user.getIdTokenResult(true);

  if (token.claims.admin) {
    console.log('✔ Admin verified');
  } else {
    alert('⛔ You are not an admin!');
    auth.signOut();
  }
});

// import {
//   getAuth,
//   onAuthStateChanged,
// } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';

// const auth = getAuth();

// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     const tokenResult = await user.getIdTokenResult(true);

//     if (tokenResult.claims.admin === true) {
//       console.log('✅ This user is ADMIN');
//       document.querySelector('#adminContainer').style.display = 'block';
//     } else {
//       console.log('⛔ Not admin — redirecting or hiding page');
//       window.location.href = 'not-allowed.html';
//     }
//   } else {
//     window.location.href = 'login.html';
//   }
// });
