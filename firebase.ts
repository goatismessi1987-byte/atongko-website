import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// আপনার অরিজিনাল ফায়ারবেস কি-গুলো এখানে বসাবেন
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", 
  authDomain: "atongko-website.firebaseapp.com",
  projectId: "atongko-website",
  storageBucket: "atongko-website.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }; // এই এক্সপোর্টটি নিশ্চিত করুন
