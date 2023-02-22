import { storage, db } from "../Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const materialsCollectionRef = collection(db, "materials");

export const getAll = async () => {
    const response = await getDocs(materialsCollectionRef);
    const data = response.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
};