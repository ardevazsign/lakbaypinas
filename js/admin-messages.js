// ---------------------------------------------
// FIREBASE IMPORTS
// ---------------------------------------------
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

// ---------------------------------------------
// FIREBASE CONFIG
// ---------------------------------------------
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
const auth = getAuth(app);

// ---------------------------------------------
// DOM ELEMENTS
// ---------------------------------------------
const messagesContainer = document.getElementById('messagesContainer');
const unreadCountEl = document.getElementById('unreadCount');
const searchInput = document.getElementById('searchInput');

let messages = [];

// ---------------------------------------------
// CHECK LOGIN
// ---------------------------------------------
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert('You must login as admin to view messages.');
    window.location.href = '../admin/admin-login.html';
  } else {
    loadMessages();
  }
});

// ---------------------------------------------
// LOAD MESSAGES SAFELY
// ---------------------------------------------
async function loadMessages() {
  let snap;

  try {
    // Try query with orderBy
    const q = query(
      collection(db, 'contactMessages'),
      orderBy('createdAt', 'desc')
    );
    snap = await getDocs(q);
  } catch (err) {
    console.warn('createdAt missing -> loading without orderBy');
    // fallback: load without orderBy
    snap = await getDocs(collection(db, 'contactMessages'));
  }

  messages = [];
  snap.forEach((docSnap) => {
    messages.push({
      id: docSnap.id,
      ...docSnap.data(),
    });
  });

  displayMessages(messages);
}

// ---------------------------------------------
// DISPLAY MESSAGES
// ---------------------------------------------
function displayMessages(list) {
  messagesContainer.innerHTML = '';
  let unreadCount = 0;

  list.forEach((msg) => {
    const isRead = msg.read === true;

    const card = document.createElement('div');
    card.classList.add('message-card');
    if (isRead) card.classList.add('read');

    const createdAt = msg.createdAt?.toDate
      ? msg.createdAt.toDate().toLocaleString()
      : 'No Date';

    card.innerHTML = `
      <p><strong>Name:</strong> ${msg.name}</p>
      <p><strong>Email:</strong> ${msg.email}</p>
      <p><strong>Phone:</strong> ${msg.phone}</p>
      <p><strong>Subject:</strong> ${msg.subject}</p>
      <p><strong>Message:</strong> ${msg.message}</p>
      <p><em>${createdAt}</em></p>

      <button class="markBtn">${isRead ? 'Mark Unread' : 'Mark Read'}</button>
      <button class="deleteBtn">Delete</button>
    `;

    if (!isRead) unreadCount++;

    // Mark read/unread
    card.querySelector('.markBtn').addEventListener('click', async () => {
      await updateDoc(doc(db, 'contactMessages', msg.id), {
        read: !msg.read,
      });
      loadMessages();
    });

    // Delete message
    card.querySelector('.deleteBtn').addEventListener('click', async () => {
      if (confirm('Delete this message?')) {
        await deleteDoc(doc(db, 'contactMessages', msg.id));
        loadMessages();
      }
    });

    messagesContainer.appendChild(card);
  });

  unreadCountEl.textContent = unreadCount;
}

// ---------------------------------------------
// SEARCH FUNCTION
// ---------------------------------------------
searchInput.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();

  const filtered = messages.filter(
    (msg) =>
      msg.name?.toLowerCase().includes(term) ||
      msg.email?.toLowerCase().includes(term) ||
      msg.subject?.toLowerCase().includes(term) ||
      msg.message?.toLowerCase().includes(term)
  );

  displayMessages(filtered);
});

// ---------------------------------------------
// FIREBASE IMPORTS
// ---------------------------------------------
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

// import {
//   getAuth,
//   onAuthStateChanged,
// } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

// // ---------------------------------------------
// // FIREBASE CONFIG
// // ---------------------------------------------
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
// const auth = getAuth(app);

// // ---------------------------------------------
// // DOM ELEMENTS
// // ---------------------------------------------
// const messagesContainer = document.getElementById('messagesContainer');
// const unreadCountEl = document.getElementById('unreadCount');
// const searchInput = document.getElementById('searchInput');

// let messages = [];

// // ---------------------------------------------
// // CHECK IF ADMIN IS LOGGED IN
// // ---------------------------------------------
// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     alert('You must login as admin to view messages.');
//     window.location.href = '../admin/admin-login.html';
//   } else {
//     loadMessages();
//   }
// });

// // ---------------------------------------------
// // LOAD MESSAGES FROM FIRESTORE
// // ---------------------------------------------
// async function loadMessages() {
//   const q = query(
//     collection(db, 'contactMessages'),
//     orderBy('createdAt', 'desc')
//   );

//   const snap = await getDocs(q);
//   messages = [];

//   snap.forEach((docSnap) => {
//     messages.push({
//       id: docSnap.id,
//       ...docSnap.data(),
//     });
//   });

//   displayMessages(messages);
// }

// // ---------------------------------------------
// // DISPLAY MESSAGES
// // ---------------------------------------------
// function displayMessages(list) {
//   messagesContainer.innerHTML = '';
//   let unreadCount = 0;

//   list.forEach((msg) => {
//     const isRead = msg.read === true;

//     const card = document.createElement('div');
//     card.classList.add('message-card');
//     if (isRead) card.classList.add('read');

//     const createdAt = msg.createdAt?.toDate
//       ? msg.createdAt.toDate().toLocaleString()
//       : 'No Date';

//     card.innerHTML = `
//       <p><strong>Name:</strong> ${msg.name}</p>
//       <p><strong>Email:</strong> ${msg.email}</p>
//       <p><strong>Phone:</strong> ${msg.phone}</p>
//       <p><strong>Subject:</strong> ${msg.subject}</p>
//       <p><strong>Message:</strong> ${msg.message}</p>
//       <p><em>${createdAt}</em></p>

//       <button class="markBtn">${isRead ? 'Mark Unread' : 'Mark Read'}</button>
//       <button class="deleteBtn">Delete</button>
//     `;

//     if (!isRead) unreadCount++;

//     // Update read/unread
//     card.querySelector('.markBtn').addEventListener('click', async () => {
//       await updateDoc(doc(db, 'contactMessages', msg.id), {
//         read: !msg.read,
//       });
//       loadMessages();
//     });

//     // Delete message
//     card.querySelector('.deleteBtn').addEventListener('click', async () => {
//       if (confirm('Delete this message?')) {
//         await deleteDoc(doc(db, 'contactMessages', msg.id));
//         loadMessages();
//       }
//     });

//     messagesContainer.appendChild(card);
//   });

//   unreadCountEl.textContent = unreadCount;
// }

// // ---------------------------------------------
// // SEARCH MESSAGES
// // ---------------------------------------------
// searchInput.addEventListener('input', (e) => {
//   const term = e.target.value.toLowerCase();

//   const filtered = messages.filter(
//     (msg) =>
//       msg.name.toLowerCase().includes(term) ||
//       msg.email.toLowerCase().includes(term) ||
//       msg.subject.toLowerCase().includes(term) ||
//       msg.message.toLowerCase().includes(term)
//   );

//   displayMessages(filtered);
// });

// ---------------------------------------------------------------------------------------------------------

// import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

// import {
//   getAuth,
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
// const db = getFirestore(app);
// const auth = getAuth();

// const messagesContainer = document.getElementById('messagesContainer');
// const unreadCountEl = document.getElementById('unreadCount');
// const searchInput = document.getElementById('searchInput');

// let messages = [];

// // Check if admin is logged in
// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     alert('You must login as admin!');
//     window.location.href = 'login.html';
//   } else {
//     loadMessages();
//   }
// });

// async function loadMessages() {
//   const q = query(
//     collection(db, 'contactMessages'),
//     orderBy('createdAt', 'desc')
//   );
//   const querySnapshot = await getDocs(q);
//   messages = [];

//   querySnapshot.forEach(docSnap => {
//     messages.push({ id: docSnap.id, ...docSnap.data() });
//   });
//   displayMessages(messages);
// }

//   messagesContainer.innerHTML = '';

//   querySnapshot.forEach((doc) => {
//     const data = doc.data();
// // Display messages
// function displayMessages(msgs) {
//   messagesContainer.innerHTML = "";
//   let unreadCount = 0;

//   msgs.forEach(msg => {
//     const card = document.createElement("div");
//     card.classList.add("message-card");
//     if (msg.read) card.classList.add("read");

//     card.innerHTML = `
//       <p><strong>Name:</strong> ${msg.name}</p>
//       <p><strong>Email:</strong> ${msg.email}</p>
//       <p><strong>Phone:</strong> ${msg.phone}</p>
//       <p><strong>Subject:</strong> ${msg.subject}</p>
//       <p><strong>Message:</strong> ${msg.message}</p>
//       <p><em>${msg.createdAt?.toDate()}</em></p>
//       <button class="markRead">${msg.read ? "Mark Unread" : "Mark Read"}</button>
//       <button class="delete">Delete</button>
//     `;

//     // Count unread
//     if (!msg.read) unreadCount++;

//     // Mark Read / Unread button
//     card.querySelector(".markRead").addEventListener("click", async () => {
//       const docRef = doc(db, "contactMessages", msg.id);
//       await updateDoc(docRef, { read: !msg.read });
//       loadMessages();
//     });

//     // Delete button
//     card.querySelector(".delete").addEventListener("click", async () => {
//       const docRef = doc(db, "contactMessages", msg.id);
//       await deleteDoc(docRef);
//       loadMessages();
//     });

//     messagesContainer.appendChild(card);
//   });

//   unreadCountEl.textContent = unreadCount;
// }

// // Search functionality
// searchInput.addEventListener("input", (e) => {
//   const term = e.target.value.toLowerCase();
//   const filtered = messages.filter(msg =>
//     msg.name.toLowerCase().includes(term) ||
//     msg.email.toLowerCase().includes(term) ||
//     msg.subject.toLowerCase().includes(term)
//   );
//   displayMessages(filtered);
// });
