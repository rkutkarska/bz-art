import { db } from "../Firebase";
import { collection, getDocs, getDoc, addDoc, doc, updateDoc } from "firebase/firestore";

const materialsCollectionRef = collection(db, "materials");

export const getAll = async () => {
    const response = await getDocs(materialsCollectionRef);
    const data = response.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
};

export const checkIfExist = (materials, materialsData) => {
    return (materials
        .map(material => (material.materialName.toLowerCase()))
        .includes((materialsData.materialName).toLowerCase()));
};

export const saveMaterial = async (e, materials, materialsData, setMaterials, setMaterialNameHasError, setIsModalOpen, setModalObject) => {
    e.preventDefault();

    if (checkIfExist(materials, materialsData)) {
        setIsModalOpen(true);
        setModalObject({ message: 'Материалът не е записан, защото вече има такъв!', type: 'error' });
        return;
    }

    if (materialsData.materialName == '' || materialsData.materialName.length < 3) {
        setIsModalOpen(true);
        setModalObject({ message: 'Материалът не е записан! Моля попълнете коректно всички полета!', type: 'error' });
        setMaterialNameHasError(true);
        return;
    } else {
        setMaterialNameHasError(false);
    }


    await addDoc(materialsCollectionRef, { ...materialsData, dateCreated: new Date() }).then(() => {
        getAll()
            .then(materials => setMaterials(materials));
        setIsModalOpen(true);
        setModalObject({ message: 'Материалът е записан успешно!', type: 'information' });
        e.target.parentElement.parentElement.reset();
    });
}

export const getMaterial = async (id, setIsModalOpen, setModalObject) => {
    try {
        const materialCollectionRef = doc(db, "materials", id);
        const docSnap = await getDoc(materialCollectionRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            setIsModalOpen(true);
            setModalObject({ message: "Документът не съществува!", type: "error" });
            return;
        }

    } catch (error) {
        setIsModalOpen(true);
        setModalObject({ message: error.message, type: "error" });
    }
};

export const updateMaterial = async (e, id, values, setIsModalOpen, setModalObject) => {
    e.preventDefault();

    const materialDoc = doc(db, 'materials', id);

    try {
        await updateDoc(materialDoc, values);
    } catch (error) {
        setIsModalOpen(true);
        setModalObject({ message: 'Записът не е обновен!', type: 'error' });
    }
}

// Form validations

export const validateName = (e, setMaterialNameHasError) => {
    if (e.target.value.length < 3) {
        setMaterialNameHasError(true);
    } else {
        setMaterialNameHasError(false);
    }
}