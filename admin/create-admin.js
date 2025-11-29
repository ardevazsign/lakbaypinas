const admin = require('firebase-admin');
admin.initializeApp();

admin
  .auth()
  .setCustomUserClaims('7nu0mr5hhkWceFhPz2wfv54utFm2', { admin: true })
  .then(() => {
    console.log('Admin claim set!');
  });
