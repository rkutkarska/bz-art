import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCC41XTcg4GsnXwcMaCuBqU15fJ5SV57GU",
  authDomain: "bz-art.firebaseapp.com",
  databaseURL: "https://bz-art-default-rtdb.firebaseio.com",
  projectId: "bz-art",
  storageBucket: "bz-art.appspot.com",
  messagingSenderId: "375146892569",
  appId: "1:375146892569:web:40361651c0c0a41f57c988"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);