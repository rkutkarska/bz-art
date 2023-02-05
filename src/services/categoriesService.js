import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";

const categoriesCollectionRef = collection(db, "categories");

export const getAll = async () => {
    const response = await getDocs(categoriesCollectionRef);
    const data = response.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
};

export const checkIfExist = (categories, formData) => {
    return (categories
        .map(category => (category.name.toLowerCase()))
        .includes((formData.name).toLowerCase()));
};