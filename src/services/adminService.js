import { storage, db } from "../Firebase";
import { collection, getDocs, addDoc, where, query, orderBy } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";

export const getAllItemsOrdered = async () => {
    const q = query(collection(db, "items"), orderBy('name'));
    // where("name", "==", true));
    return await getDocs(q);
};