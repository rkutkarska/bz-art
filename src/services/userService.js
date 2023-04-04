import { db } from "../Firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export const saveUserData = async (userData) => {
    const userRef = doc(db, `users`, userData.user.uid);
    setDoc(userRef, { 'role': 1 });
}

export const getUserById = () => {
    // TODO
}