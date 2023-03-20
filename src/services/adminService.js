import { db } from "../Firebase";
import { collection, getDocs, doc, deleteDoc, where, query, orderBy } from "firebase/firestore";

export const getAllItemsOrdered = async (documentType, documentSortType) => {
    if (documentType === '') {
        return false;
    }

    if (documentSortType === '') {
        const q = query(collection(db, documentType));
        return await getDocs(q);
    }

    const [param, order] = documentSortType.split(', ');
    const q = query(collection(db, documentType), orderBy(param, order));

    return await getDocs(q);
    // where("name", "==", true));
};

function deleteRow(id, documents, setDocuments) {
    let copy = [...documents];
    copy = copy.filter((document) => document.id !== id);
    setDocuments(copy);
}

export const deleteItem = async (id, documents, setDocuments, isClicked) => {
    const itemDoc = doc(db, "items", id);
    try {
        const response = await deleteDoc(itemDoc).then(() => true);
        if (response) {
            deleteRow(id, documents, setDocuments);
            isClicked.current = true;
        }
    } catch (error) {
        // TODO modal -> error.message error.code;
    }
}

export const deleteCategory = async (id, documents, setDocuments, isClicked /*, setIsModalOpen, setModalObject, isConfirmed*/) => {
    // setIsModalOpen(true);
    // setModalObject({ message: 'Сигурни ли сте, че искате да изтриете записа?', type: 'confirm' });

    const categoryDoc = doc(db, "categories", id);
    try {
        const response = await deleteDoc(categoryDoc).then(() => true);
        if (response) {
            deleteRow(id, documents, setDocuments);
            isClicked.current = true;
        }
    } catch (error) {
        // TODO modal -> error.message error.code;
    }
}

export const deleteMaterial = async (id, documents, setDocuments, isClicked) => {
    const materialDoc = doc(db, "materials", id);
    try {
        const response = await deleteDoc(materialDoc).then(() => true);
        if (response) {
            deleteRow(id, documents, setDocuments);
            isClicked.current = true;
        }
    } catch (error) {
        // TODO modal -> error.message error.code;
    }
}