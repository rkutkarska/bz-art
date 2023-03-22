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

export const deleteItem = async (id, documents, setDocuments, isClicked, setIsModalOpen, setModalObject) => {
    const itemDoc = doc(db, "items", id);
    try {
        deleteDoc(itemDoc)
            .then(() => {
                deleteRow(id, documents, setDocuments);
                isClicked.current = true;
            })
            .catch((err) => { throw new Error(err) });
    } catch (error) {
        setIsModalOpen(true);
        setModalObject({ message: `Грешка! Съобщение за грешка: ${error.message}, код на грешката: ${error.code}`, type: 'error' });
    }
}

export const deleteCategory = (id, documents, setDocuments, isClicked, setIsModalOpen, setModalObject) => {
    const categoryDoc = doc(db, "categories", id);

    try {
        deleteDoc(categoryDoc)
            .then(() => {
                deleteRow(id, documents, setDocuments);
                isClicked.current = true;
            })
            .catch((err) => { throw new Error(err) });
    } catch (error) {
        setIsModalOpen(true);
        setModalObject({ message: `Грешка! Съобщение за грешка: ${error.message}, код на грешката: ${error.code}`, type: 'error' });
    }
}

export const deleteMaterial = async (id, documents, setDocuments, isClicked, setIsModalOpen, setModalObject) => {
    const materialDoc = doc(db, "materials", id);
    try {
        deleteDoc(materialDoc)
            .then(() => {
                deleteRow(id, documents, setDocuments);
                isClicked.current = true;
            })
            .catch((err) => { throw new Error(err) });
    } catch (error) {
        setIsModalOpen(true);
        setModalObject({ message: `Грешка! Съобщение за грешка: ${error.message}, код на грешката: ${error.code}`, type: 'error' });
    }
}