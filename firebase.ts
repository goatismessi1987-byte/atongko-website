
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

/**
 * FIREBASE CONFIGURATION:
 * The databaseURL has been updated as per your request.
 * Please ensure the other fields (apiKey, projectId, etc.) are filled 
 * with values from your Firebase Console for full functionality.
 */
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "atongko-web.firebaseapp.com",
  databaseURL: "https://atongko-web-default-rtdb.firebaseio.com",
  projectId: "atongko-web",
  storageBucket: "atongko-web.appspot.com",
  messagingSenderId: "REPLACE_WITH_YOUR_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
