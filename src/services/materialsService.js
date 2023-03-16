import { db } from "../Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const materialsCollectionRef = collection(db, "materials");

export const getAll = async () => {
    const response = await getDocs(materialsCollectionRef);
    const data = response.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
};


export const saveMaterial = (e, materialsData) => {
    e.preventDefault();
    addDoc(materialsCollectionRef, { ...materialsData, dateCreated: new Date() });
    e.target.previousSibling.value = '';
}