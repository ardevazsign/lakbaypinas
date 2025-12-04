import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import {
  getFirestore,
  getDocs,
  collection,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';

// -------------------------
// FIREBASE CONFIG
// -------------------------
const firebaseConfig = {
  apiKey: 'AIzaSyB6h-jvp3vMYRX8kNllCAkur_faZODOqcs',
  authDomain: 'lakbaypinas-ec16f.firebaseapp.com',
  projectId: 'lakbaypinas-ec16f',
  storageBucket: 'lakbaypinas-ec16f.firebasestorage.app',
  messagingSenderId: '646279681470',
  appId: '1:646279681470:web:ab8a9248560559f62a55ef',
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// Table body
const tableBody = document.querySelector('#requestsTable tbody');

// -------------------------
// FETCH DATA FUNCTION
// -------------------------
async function loadRequests() {
  const querySnapshot = await getDocs(collection(db, 'quotationRequests'));

  tableBody.innerHTML = ''; // clear table

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const row = `
      <tr>
        <td>${data.origin}</td>
        <td>${data.destination}</td>
        <td>${data.seniorCitizen}</td>
        <td>${data.pwd}</td>
        <td>${data.adult}</td>
        <td>${data.children}</td>
        <td>${data.infants}</td>
        <td>${data.departing}</td>
        <td>${data.leaving}</td>
        <td>${data.mobile}</td>
        <td>${data.email}</td>
        <td>${data.timestamp.toDate().toLocaleString()}</td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });
}

// -------------------------
// CHECK IF ADMIN IS LOGGED IN
// -------------------------
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert('Access denied. Please login as admin.');
    window.location.href = 'index.html';
    return;
  }

  // OPTIONAL: Check admin claim
  // If you have admin claims, uncomment below:
  //
  // const token = await user.getIdTokenResult();
  // if (!token.claims.admin) {
  //   alert("You are not an admin!");
  //   window.location.href = "index.html";
  //   return;
  // }

  loadRequests();
});
