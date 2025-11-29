// -------------------------------
// FIREBASE SETUP
// -------------------------------
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

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

// -------------------------------
// MODAL OPEN / CLOSE
// -------------------------------
const modalTwo = document.getElementById('modal2');
const openButtons = document.querySelectorAll('.openModal2');
const closeBtn = document.getElementById('closeModal2');

// Open modal from ANY button
openButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    modalTwo.style.display = 'block';
  });
});

// openButtons.addEventListener('click', () => {
//   modalTwo.style.display = 'block';
// });

closeBtn.addEventListener('click', () => {
  modalTwo.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target == modalTwo) modalTwo.style.display = 'none';
});

// -------------------------------
// HANDLE FORM SUBMISSION
// -------------------------------
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

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
      createdAt: new Date(),
    });

    alert('Booking Submitted Successfully!');

    bookingForm.reset(); // clear form
    modalTwo.style.display = 'none'; // close modal
  } catch (error) {
    console.error('Error saving booking:', error);
    alert('Error submitting booking.');
  }
});
