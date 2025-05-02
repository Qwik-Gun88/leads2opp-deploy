import admin from 'firebase-admin';
import fs from 'fs';

// ✅ Load Firebase config from the mounted secret path
const serviceAccount = JSON.parse(
  fs.readFileSync('/secrets/FIREBASE_CONFIG', 'utf-8')
);

// ✅ Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ✅ Export Firestore instance
const db = admin.firestore();
export default db;
