import { storage, db } from "../Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const collectionsRef = collection(db, "*");

export const getAllCollectionNames = async () => {
};