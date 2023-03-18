import { storage, db } from "../Firebase";
import { collection, getDocs, addDoc, getDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const categoriesCollectionRef = collection(db, "categories");

export const getAll = async () => {
    const response = await getDocs(categoriesCollectionRef);
    const data = response.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
};

export const checkIfExist = (categories, categoriesData) => {
    return (categories
        .map(category => (category.categoryName.toLowerCase()))
        .includes((categoriesData.categoryName).toLowerCase()));
};

export const saveCategory = async (e, categories, categoriesData, imageUpload, setCategories) => {
    e.preventDefault();
    if (checkIfExist(categories, categoriesData)) {
        // alert('Категорията не е записана, защото вече има такава!');
        return;
    } else if (categoriesData.categoryName === '') {
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
            addDoc(categoriesCollectionRef, { ...categoriesData, categoryImageUrl: url, dateCreated: new Date() });
            getAll()
            .then(categories => setCategories(categories));
        })

        e.target.previousSibling.value = "";
    });
};

export const getCategory = async (id) => {
    try {
        const categoryCollectionRef = doc(db, "categories", id);
        const docSnap = await getDoc(categoryCollectionRef);
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