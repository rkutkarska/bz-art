import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from '@firebase/firestore';

import { getAuth } from "firebase/auth";

const firebaseConfig = {
	// Your web app's Firebase configuration
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

export const auth = getAuth(app);