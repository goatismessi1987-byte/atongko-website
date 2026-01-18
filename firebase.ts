import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // আপনার অরিজিনাল কি এখানে থাকবে
  authDomain: "atongko-website.firebaseapp.com",
  projectId: "atongko-website",
  storageBucket: "atongko-website.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // এটি ছাড়া বিল্ড ফেইল হবে
