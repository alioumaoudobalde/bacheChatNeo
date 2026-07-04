// firebase/firebase-config.js

// Importation des modules Firebase depuis le CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAboaI0WeYEtkmyj0h785WXaZ9ihmXW09U",
  authDomain: "bacheliers-neo.firebaseapp.com",
  projectId: "bacheliers-neo",
  storageBucket: "bacheliers-neo.firebasestorage.app",
  messagingSenderId: "516456249000",
  appId: "1:516456249000:web:beb06858a2fbe02914f49d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
