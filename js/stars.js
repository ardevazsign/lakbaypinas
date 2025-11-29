import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getFirestore,
  doc,
  getDoc,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyB6h-jvp3vMYRX8kNllCAkur_faZODOqcs',
  authDomain: 'lakbaypinas-ec16f.firebaseapp.com',
  projectId: 'lakbaypinas-ec16f',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Select all package cards
const packageCards = document.querySelectorAll('.box');

packageCards.forEach(async (card) => {
  const packageId = card.dataset.package; // e.g., "package9"
  const stars = card.querySelectorAll('.star');
  const ratingText = card.querySelector('.ratingText');

  const snap = await getDoc(doc(db, 'ratings', packageId));
  if (!snap.exists()) return;

  const percent = snap.data().percentage;
  const starCount = Math.round(percent / 20); // 0-5 stars

  // Fill stars
  stars.forEach((star, index) => {
    if (index < starCount) {
      star.classList.add('filled');
    } else {
      star.classList.remove('filled');
    }
  });

  // Update text
  ratingText.textContent = `Rating: ${percent}%`;
});
