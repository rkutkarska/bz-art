import { storage, db } from "../Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const categoriesCollectionRef = collection(db, "categories");

export const getAll = async () => {
    const response = await getDocs(categoriesCollectionRef);
    const data = response.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
};

export const checkIfExist = (categories, values) => {
    return (categories
        .map(category => (category.name.toLowerCase()))
        .includes((values.name).toLowerCase()));
};

export const saveCategory = async (e, categories, values, imageUpload, setCategories) => {
    e.preventDefault();
    if (checkIfExist(categories, values)) {
        // alert('Категорията не е записана, защото вече има такава!');
        return;
    } else if (values.name === '') {
        // alert('Моля, въведете категория!');
        return;
    } else if (imageUpload === '') {
        // alert('Неуспешно качване!');
        e.target.value = '';
        return;
    }

    const imageRef = ref(storage, `images/categories/${v4() + imageUpload.name}`);

    await uploadBytes(imageRef, imageUpload).then(() => {
        // alert('Файлът е качен успешно!');
        getDownloadURL(imageRef).then((url) => {
            addDoc(categoriesCollectionRef, { ...values, url, dateCreated: new Date() });
            getAll()
            .then(categories => setCategories(categories));
        })

        e.target.previousSibling.value = "";
    });
};