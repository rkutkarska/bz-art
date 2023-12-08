import { storage, db } from "../Firebase";
import { collection, getDocs, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const categoriesCollectionRef = collection(db, "categories");

export const getAll = async () => {
    try {
        const response = await getDocs(categoriesCollectionRef);
        const data = response.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
        return data;
    } catch (error) {
        //  TODO modal  'Неуспешно извличане на категория!
    }
};

export const checkIfExist = (categories, categoriesData) => {
    return (categories
        .map(category => (category.categoryName.toLowerCase()))
        .includes((categoriesData.categoryName).toLowerCase()));
};

export const saveCategory = async (e, categories, categoriesData, imageUpload, setCategories, setCategoryNameHasError, setIsModalOpen, setModalObject) => {
    e.preventDefault();

    if (checkIfExist(categories, categoriesData)) {
        setIsModalOpen(true);
        setModalObject({ message: 'Категорията не е записана, защото вече има такава!', type: 'error' });
        return;
    }

    if (categoriesData.categoryName === '' || categoriesData.categoryName.length < 3) {
        setCategoryNameHasError(true);
        setIsModalOpen(true);
        setModalObject({ message: 'Категорията не е записана! Моля попълнете коректно всички полета!', type: 'error' });
        return;
    } else {
        setCategoryNameHasError(false);
    }

    if (imageUpload === '') {
        setIsModalOpen(true);
        setModalObject({ message: 'Категорията не е записана! Моля качете изображение!', type: 'error' });
        return;
    } else {
        setCategoryNameHasError(false);
    }

    const imageRef = ref(storage, `images/categories/${v4() + imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload).then(() => {
        getDownloadURL(imageRef).then((url) => {
            addDoc(categoriesCollectionRef, { ...categoriesData, categoryImageUrl: url, dateCreated: new Date() });
            getAll()
                .then(categories => setCategories(categories));
            setIsModalOpen(true);
            setModalObject({ message: 'Категорията е записана успешно!', type: 'information' });
        })
    });
};

export const getCategory = async (id) => {
    try {
        const categoryDocumentRef = doc(db, "categories", id);
        const docSnap = await getDoc(categoryDocumentRef);
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
};

export const uploadCategoryImage = async (imageUpload, updateCategoriesData) => {
    const imageRef = ref(storage, `images/categories/${v4() + imageUpload.name}`);

    await uploadBytes(imageRef, imageUpload).then(() => {
        // TODO modal
        // alert('Файлът е качен успешно!');
        getDownloadURL(imageRef).then((url) => {
            updateCategoriesData((values) => ({ ...values, categoryImageUrl: url }));
        })
    });
}

export const updateCategory = async (e, id, values, setModalObject, setIsModalOpen) => {
    e.preventDefault();

    const categoryDoc = doc(db, 'categories', id);

    try {
        await updateDoc(categoryDoc, values);
        setIsModalOpen(true);
        setModalObject({ message: 'Записът е обновен успешно!', type: 'information' });
    } catch (error) {
        setIsModalOpen(true);
        setModalObject({ message: 'Записът не е обновен!', type: 'error' });
    }
}

// Form validations
export const validateName = (e, setCategoryNameHasError) => {
    if (e.target.value.length < 3) {
        setCategoryNameHasError(true);
    } else {
        setCategoryNameHasError(false);
    }
}