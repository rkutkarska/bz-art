import { db } from "../Firebase";
import { collection, getDocs, getDoc, doc, deleteDoc, where, query, orderBy } from "firebase/firestore";

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

export const deleteItem = (id, documents, setDocuments, isClicked, setModalObject) => {
    const itemDoc = doc(db, "items", id);
    
    deleteDoc(itemDoc)
        .then(() => {
            getDoc(itemDoc)
                .then((value) => {
                    if (value.data()) {
                        setModalObject({ message: 'Записът не е изтрит!', type: 'error' });
                    } else {
                        deleteRow(id, documents, setDocuments);
                        isClicked.current = true;
                    }
                })
                .catch(error => {
                    setModalObject({ message: `Грешка! Message: ${error.message}`, type: 'error' });
                })
        })
}

export const deleteCategory = (id, documents, setDocuments, isClicked, setIsModalOpen, setModalObject) => {
    const categoryDoc = doc(db, "categories", id);

    deleteDoc(categoryDoc)
        .then(() => {
            getDoc(categoryDoc)
                .then((value) => {
                    if (value.data()) {
                        setIsModalOpen(true);
                        setModalObject({ message: 'Записът не е изтрит!', type: 'error' });
                    } else {
                        deleteRow(id, documents, setDocuments);
                        isClicked.current = true;
                    }
                })
                .catch(error => {
                    setIsModalOpen(true);
                    setModalObject({ message: `Грешка! Message: ${error.message}`, type: 'error' });
                })
        })
}

export const deleteMaterial = async (id, documents, setDocuments, isClicked, setIsModalOpen, setModalObject) => {
    const materialDoc = doc(db, "materials", id);

    deleteDoc(materialDoc)
        .then(() => {
            getDoc(materialDoc)
                .then((value) => {
                    if (value.data()) {
                        setIsModalOpen(true);
                        setModalObject({ message: 'Записът не е изтрит!', type: 'error' });
                    } else {
                        deleteRow(id, documents, setDocuments);
                        isClicked.current = true;
                    }
                })
                .catch(error => {
                    setIsModalOpen(true);
                    setModalObject({ message: `Грешка! Message: ${error.message}`, type: 'error' });
                })
        })
}