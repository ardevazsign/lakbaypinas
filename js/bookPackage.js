// -------------------------------
// FIREBASE SETUP
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
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';

// Your Firebase Config
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
// ELEMENTS
// -------------------------------
const bookingForm = document.getElementById('bookingForm');
const loginReminder = document.getElementById('loginReminder');

// -------------------------------
// AUTH CHECK — SHOW/HIDE FORM
// -------------------------------
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    bookingForm.style.display = 'block';
    loginReminder.style.display = 'none';

    // Auto-fill email field (optional)
    const emailField = document.getElementById('emailBooker');
    if (emailField && user.email) {
      emailField.value = user.email;
    }
  } else {
    // User NOT logged in
    bookingForm.style.display = 'none';
    loginReminder.style.display = 'block';
  }
});

// -------------------------------
// MODAL OPEN / CLOSE
// -------------------------------
const modalTwo = document.getElementById('modal2');
const openButtons = document.querySelectorAll('.openModal2');
const closeBtn = document.getElementById('closeModal2');

let scrollPosition = 0;

openButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    scrollPosition = window.pageYOffset;
    document.body.style.top = `-${scrollPosition}px`;
    document.body.classList.add('no-scroll');

    modalTwo.style.display = 'block';
  });
});

closeBtn.addEventListener('click', () => {
  modalTwo.style.display = 'none';
  document.body.classList.remove('no-scroll');
  document.body.style.top = '';

  // Restore scroll
  window.scrollTo(0, scrollPosition);
});

window.addEventListener('click', (e) => {
  if (e.target == modalTwo) modalTwo.style.display = 'none';
});

// -------------------------------
// HANDLE FORM SUBMISSION
// -------------------------------
bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Prevent submitting if not logged-in
  const user = auth.currentUser;
  if (!user) {
    alert('Please login before booking a package.');
    return;
  }

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('emailBooker').value;
  const phone = document.getElementById('phone').value;
  const packageName = document.getElementById('packageName').value;
  const travelDate = document.getElementById('travelDate').value;
  const traveler = document.getElementById('traveler').value;

  try {
    await addDoc(collection(db, 'bookings'), {
      fullName,
      email,
      phone,
      packageName,
      travelDate,
      traveler,
      userId: user.uid, // SAVE USER ID
      createdAt: new Date(),
    });

    alert('Booking Submitted Successfully!');
    bookingForm.reset();
    modalTwo.style.display = 'none';
  } catch (error) {
    console.error('Error saving booking:', error);
    alert('Error submitting booking.');
  }
});

// // -------------------------------
// // FIREBASE SETUP
// // -------------------------------
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
// import {
//   getFirestore,
//   collection,
//   addDoc,
// } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

// // Your Firebase Config
// const firebaseConfig = {
//   apiKey: 'AIzaSyB6h-jvp3vMYRX8kNllCAkur_faZODOqcs',
//   authDomain: 'lakbaypinas-ec16f.firebaseapp.com',
//   projectId: 'lakbaypinas-ec16f',
//   storageBucket: 'lakbaypinas-ec16f.firebasestorage.app',
//   messagingSenderId: '646279681470',
//   appId: '1:646279681470:web:ab8a9248560559f62a55ef',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // -------------------------------
// // MODAL OPEN / CLOSE
// // -------------------------------
// const modalTwo = document.getElementById('modal2');
// const openButtons = document.querySelectorAll('.openModal2');
// const closeBtn = document.getElementById('closeModal2');

// let scrollPosition = 0;

// openButtons.forEach((btn) => {
//   btn.addEventListener('click', () => {
//     // Save scroll position BEFORE locking body
//     scrollPosition = window.pageYOffset;

//     // Lock body scroll
//     document.body.style.top = `-${scrollPosition}px`;
//     document.body.classList.add('no-scroll');

//     // Open modal
//     modalTwo.style.display = 'block';
//   });
// });

// // Open modal from ANY button
// // openButtons.forEach((btn) => {
// //   btn.addEventListener('click', () => {
// //     modalTwo.style.display = 'block';
// //     document.body.classList.add('no-scroll');
// //   });
// // });

// // openButtons.addEventListener('click', () => {
// //   modalTwo.style.display = 'block';
// // });

// // closeBtn.addEventListener('click', () => {
// //   modalTwo.style.display = 'none';
// //   document.body.classList.remove('no-scroll');
// // });

// closeBtn.addEventListener('click', () => {
//   // Close modal
//   modalTwo.style.display = 'none';

//   // Unlock body scroll
//   document.body.classList.remove('no-scroll');
//   document.body.style.top = '';

//   // Restore previous scroll position
//   window.scrollTo(0, scrollPosition);
// });

// window.addEventListener('click', (e) => {
//   if (e.target == modalTwo) modalTwo.style.display = 'none';
// });

// // -------------------------------
// // HANDLE FORM SUBMISSION
// // -------------------------------
// const bookingForm = document.getElementById('bookingForm');

// bookingForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const fullName = document.getElementById('fullName').value;
//   const email = document.getElementById('emailBooker').value;
//   const phone = document.getElementById('phone').value;
//   const packageName = document.getElementById('packageName').value;
//   const travelDate = document.getElementById('travelDate').value;
//   const traveler = document.getElementById('traveler').value;

//   try {
//     await addDoc(collection(db, 'bookings'), {
//       fullName,
//       email,
//       phone,
//       packageName,
//       travelDate,
//       traveler,
//       createdAt: new Date(),
//     });

//     alert('Booking Submitted Successfully!');

//     bookingForm.reset(); // clear form
//     modalTwo.style.display = 'none'; // close modal
//   } catch (error) {
//     console.error('Error saving booking:', error);
//     alert('Error submitting booking.');
//   }
// });
