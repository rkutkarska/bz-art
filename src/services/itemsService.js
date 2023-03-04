import { db, storage } from "../Firebase";
import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const getItem = async (id) => {
    try {
        const itemsCollectionRef = doc(db, "items", id);
        const docSnap = await getDoc(itemsCollectionRef);
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

export const saveItem = async (e, itemImageUpload, itemsData, setIsModalOpen, setModalObject) => {
    e.preventDefault();

    const imageRef = ref(storage, `images/items/${v4() + itemImageUpload.name}`);

    if (itemImageUpload === '') {
        e.target.value = '';
        setModalObject({ message: 'Изображението не е качено!', type: 'error' });
        return
    }

    await uploadBytes(imageRef, itemImageUpload).then(() => {
        getDownloadURL(imageRef).then((url) => {
            const itemsCollectionRef = collection(db, 'items');
            addDoc(itemsCollectionRef, { ...itemsData, imageUrl: url, dateCreated: new Date() });
            setIsModalOpen(true);
            setModalObject({ message: 'Продуктът е добавен успешно!', type: 'information' });
        });
    });

    e.target.reset();
}