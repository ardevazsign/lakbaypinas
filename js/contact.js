// Firebase imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

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
const db = getFirestore(app);

// DOM
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('emailContact');
const phoneInput = document.getElementById('phoneContact');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Submit Event
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, 'contactMessages'), {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      subject: subjectInput.value,
      message: messageInput.value,
      createdAt: serverTimestamp(),
    });

    alert('Message sent successfully!');
    form.reset();
  } catch (error) {
    alert('Error sending message: ' + error.message);
  }
});
