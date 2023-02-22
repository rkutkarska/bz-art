import { db } from "../Firebase";
import { collection, doc, getDoc } from "firebase/firestore";


export const getItem = async (id) => {
    try {
        const itemsCollectionRef = doc(db, "items", id);
        const docSnap = await getDoc(itemsCollectionRef);
        if(docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Document does not exist!")
        }

    } catch(error) {
        console.log(error)
    }
};