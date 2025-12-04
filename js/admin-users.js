import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyB6h-jvp3vMYRX8kNllCAkur_faZODOqcs',
  authDomain: 'lakbaypinas-ec16f.firebaseapp.com',
  projectId: 'lakbaypinas-ec16f',
  storageBucket: 'lakbaypinas-ec16f.firebasestorage.app',
  messagingSenderId: '646279681470',
  appId: '1:646279681470:web:ab8a9248560559f62a55ef',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load all users
async function loadUsers() {
  const tableBody = document.getElementById('userTableBody');

  const querySnapshot = await getDocs(collection(db, 'users'));

  querySnapshot.forEach((doc) => {
    const user = doc.data();

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.email}</td>
      <td>${user.uid}</td>
      <td>${user.createdAt ? user.createdAt.toDate().toLocaleString() : ''}</td>
    `;

    tableBody.appendChild(tr);
  });
}

loadUsers();
