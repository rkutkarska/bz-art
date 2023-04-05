import { db } from "../Firebase";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export const saveUserData = async (userData) => {
    const userRef = doc(db, `users`, userData.user.uid);
    setDoc(userRef, { 'role': 2 });
}

export const getUserRole = async (userId) => {
    try {
        const userDocumentRef = doc(db, `users/${userId}`);
        const docSnap = await getDoc(userDocumentRef);
        if (docSnap.exists(docSnap.data())) {
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
}