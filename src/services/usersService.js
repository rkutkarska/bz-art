import { db } from "../Firebase";
import { collection, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export const saveUserData = async (userData, email) => {
    const userRef = doc(db, `users`, userData.user.uid);
    setDoc(userRef, { 'role': 2, 'email': email });
}

export const getUserData = async (userId) => {
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

export const updateUserRole = async (e, id, userRole, setModalObject) => {
    e.preventDefault();

    const userDoc = doc(db, 'users', id);

    try {
        await updateDoc(userDoc, userRole);
        setModalObject({ message: 'Записът е обновен успешно!', type: 'information' });
    } catch (error) {
        setModalObject({ message: 'Записът не е обновен!', type: 'error' });
    }
}