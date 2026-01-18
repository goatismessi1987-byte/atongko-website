import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // এটি যোগ করা হয়েছে

// আপনার ফায়ারবেস কনফিগারেশন (এটি আপনার নিজেরটা ব্যবহার করবেন)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "atongko-group-website.firebaseapp.com",
  projectId: "atongko-group-website",
  storageBucket: "atongko-group-website.firebasestorage.app", // এটি গুরুত্বপূর্ণ
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // এটি export করা হয়েছে
