import { db } from "../Firebase";
import { collection, getDocs, getDoc, addDoc, doc } from "firebase/firestore";

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

export const getMaterial = async (id) => {
    try {
        const materialCollectionRef = doc(db, "materials", id);
        const docSnap = await getDoc(materialCollectionRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            // TODO modal
            // setModalObject({ message: "Document does not exist!", type: "error" });
            return;
        }

    } catch (error) {
        // TODO modal
        // setModalObject({ message: error, type: "error" });
    }
};