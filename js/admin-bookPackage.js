// -------------------------------
// FIREBASE SETUP
// -------------------------------
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

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

// HTML elements
const table = document.getElementById('bookingTable');
const tableBody = document.getElementById('bookingData');
const loading = document.getElementById('loading');

// -------------------------------
// FETCH AND DISPLAY BOOKINGS
// -------------------------------
async function loadBookings() {
  try {
    const querySnapshot = await getDocs(collection(db, 'bookings'));

    if (querySnapshot.empty) {
      loading.textContent = 'No bookings found.';
      return;
    }

    loading.style.display = 'none';
    table.style.display = 'table';

    querySnapshot.forEach((doc) => {
      const booking = doc.data();

      const row = `
        <tr>
          <td>${booking.fullName}</td>
          <td>${booking.email}</td>
          <td>${booking.phone}</td>
          <td>${booking.packageName}</td>
          <td>${booking.travelDate}</td>
          <td>${booking.traveler}</td>
          <td>${new Date(
            booking.createdAt.seconds * 1000
          ).toLocaleString()}</td>
        </tr>
      `;

      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error('Error loading bookings:', error);
    loading.textContent = 'Error loading data.';
  }
}

loadBookings();
