import { storage, db } from "../Firebase";
import { collection, getDocs, addDoc, where, query, orderBy } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";

export const getAllItemsOrdered = async (documentType, documentSortType) => {
    if (documentType == '') {
        return false;
    }

    if (documentSortType == '') {
        const q = query(collection(db, documentType));
        return await getDocs(q);
    }

    const [param, order] = documentSortType.split(', ');
    const q = query(collection(db, documentType), orderBy(param, order));
    return await getDocs(q);

    // where("name", "==", true));
};