// -------------------------------
// 🔥 FIREBASE IMPORTS
// -------------------------------
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';

// -------------------------------
// 🔥 FIREBASE CONFIG
// -------------------------------
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
const db = getFirestore(app);
const auth = getAuth();

// -------------------------------
// 🚀 DOM ELEMENTS
// -------------------------------
const quoteForm = document.getElementById('quoteForm');
// const loginModal = document.getElementById('authModal');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginSubmit = document.getElementById('loginSubmit');

let formDataToSubmit = null; // store form temporarily if login required

// -------------------------------
// 🔍 AUTH STATE LISTENER
// -------------------------------
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User logged in:', user.email);

    // Hide login modal if visible
    if (loginModal) loginModal.style.display = 'none';
  } else {
    console.log('User not logged in');
  }
});

// -------------------------------
// ✏️ FUNCTION: Get form data
// -------------------------------
function getFormData() {
  return {
    origin: document.getElementById('origin').value.trim(),
    destination: document.getElementById('destination').value.trim(),
    seniorCitizen: document.getElementById('seniorCitizen').value,
    pwd: document.getElementById('pwd').value,
    adult: document.getElementById('adult').value,
    children: document.getElementById('children').value,
    infants: document.getElementById('infants').value,
    departing: document.getElementById('departing').value,
    leaving: document.getElementById('leaving').value,
    mobile: document.getElementById('mobile').value.trim(),
    email: document.getElementById('email').value.trim(),
    timestamp: new Date(),
  };
}

// -------------------------------
// 💾 FUNCTION: Save to Firestore
// -------------------------------
async function submitQuoteToFirestore() {
  try {
    if (!formDataToSubmit) {
      alert('Form data is empty!');
      return;
    }

    await addDoc(collection(db, 'quotationRequests'), formDataToSubmit);

    alert('Quotation request submitted successfully!');
    quoteForm.reset();
    formDataToSubmit = null;
  } catch (error) {
    alert('Error submitting request: ' + error.message);
  }
}

// -------------------------------
// 🚀 FORM SUBMIT LOGIC
// -------------------------------
quoteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = auth.currentUser;

  // Collect form data
  formDataToSubmit = getFormData();

  if (!user) {
    // Show login modal first
    loginModal.style.display = 'flex';
    return;
  }

  // User logged in → submit
  submitQuoteToFirestore();
});

// -------------------------------
// 🔐 LOGIN BUTTON HANDLER
// -------------------------------
loginSubmit.addEventListener('click', async () => {
  const email = loginEmail.value.trim();
  const pass = loginPassword.value;

  if (!email || !pass) {
    alert('Please enter email and password.');
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, pass);

    // Hide modal
    loginModal.style.display = 'none';

    // Submit the quote after login
    if (formDataToSubmit) {
      submitQuoteToFirestore();
    }
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
});

// -------------------------------
// 🔥 FIREBASE IMPORTS
// -------------------------------
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
// import {
//   getFirestore,
//   collection,
//   addDoc,
// } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

// import {
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
// } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';

// -------------------------------
// 🔥 FIREBASE CONFIG
// -------------------------------
// const firebaseConfig = {
//   apiKey: 'AIzaSyB6h-jvp3vMYRX8kNllCAkur_faZODOqcs',
//   authDomain: 'lakbaypinas-ec16f.firebaseapp.com',
//   projectId: 'lakbaypinas-ec16f',
//   storageBucket: 'lakbaypinas-ec16f.firebasestorage.app',
//   messagingSenderId: '646279681470',
//   appId: '1:646279681470:web:ab8a9248560559f62a55ef',
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth();

// const quoteForm = document.getElementById('quoteForm');
// const loginModal = document.getElementById('authModal');
// const loginEmail = document.getElementById('loginEmail');
// const loginPassword = document.getElementById('loginPassword');
// const loginSubmit = document.getElementById('loginSubmit');
// ------------------------------------------
// 🔍 AUTH STATE LISTENER (ADD THIS HERE)
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log('User logged in:', user.email);

//     // Hide login modal if visible
//     if (loginModal) loginModal.style.display = 'none';
//   } else {
//     console.log('User not logged in');
//   }
// });

// -------------------------------
// 🚀 FORM SUBMIT LOGIC
// -------------------------------
// const quoteForm = document.getElementById('quoteForm');
// const loginModal = document.getElementById('authModal');

// let formDataToSubmit = null; // store temporarily

// quoteForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const user = auth.currentUser;

//   // If not logged in → show login modal first
//   if (!user) {
//     loginModal.style.display = 'flex';

//     formDataToSubmit = getFormData(); // store data temporarily
//     return;
//   }

// If logged in → directly save
//   submitQuoteToFirestore();
// });

// -------------------------------
// ✏️ FUNCTION: Get form data
// -------------------------------
// function getFormData() {
//   return {
//     origin: document.getElementById('origin').value.trim(),
//     destination: document.getElementById('destination').value.trim(),
//     seniorCitizen: document.getElementById('seniorCitizen').value,
//     pwd: document.getElementById('pwd').value,
//     adult: document.getElementById('adult').value,
//     children: document.getElementById('children').value,
//     infants: document.getElementById('infants').value,
//     departing: document.getElementById('departing').value,
//     leaving: document.getElementById('leaving').value,
//     mobile: document.getElementById('mobile').value.trim(),
//     email: document.getElementById('email').value.trim(),
//     timestamp: new Date(),
//   };
// }

// // -------------------------------
// // 💾 FUNCTION: Save to Firestore
// // -------------------------------
// async function submitQuoteToFirestore() {
//   try {
//     const docRef = await addDoc(
//       collection(db, 'quotationRequests'),
//       formDataToSubmit
//     );
//     alert('Quotation request submitted successfully!');
//     quoteForm.reset();
//     formDataToSubmit = null;
//   } catch (error) {
//     alert('Error submitting request: ' + error.message);
//   }
// }

// // -------------------------------
// // 🔐 LOGIN BUTTON HANDLER
// // -------------------------------
// document.getElementById('loginSubmit').addEventListener('submit', async () => {
//   const email = document.getElementById('loginEmail').value;
//   const pass = document.getElementById('loginPassword').value;

//   try {
//     await signInWithEmailAndPassword(auth, email, pass);

//     loginModal.style.display = 'none';

//     // Continue submitting the quote
//     if (formDataToSubmit) {
//       submitQuoteToFirestore();
//     }
//   } catch (error) {
//     alert('Login failed: ' + error.message);
//   }
// });
