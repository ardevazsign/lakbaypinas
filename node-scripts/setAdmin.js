// setAdmin.js
// This script sets a Firebase user as admin using a service account key
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };
// const admin = require('firebase-admin');
// const serviceAccount = require('./serviceAccountKey.json'); // must be in the same folder

// ---------------------------
// Initialize Firebase Admin SDK
// ---------------------------
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ---------------------------
// CHANGE THIS: Replace with the UID of the user you want to make admin
// ---------------------------
const uid = '7nu0mr5hhkWceFhPz2wfv54utFm2';

// ---------------------------
// Set the custom claim { admin: true }
// ---------------------------
admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`✅ Admin claim set successfully for UID: ${uid}`);
    process.exit(0); // exit the script
  })
  .catch((error) => {
    console.error('❌ Error setting admin claim:', error);
    process.exit(1);
  });
