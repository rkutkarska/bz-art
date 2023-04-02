import { db, storage } from "../Firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const getItem = async (id, setIsModalOpen, setModalObject) => {
    try {
        const itemCollectionRef = doc(db, "items", id);
        const docSnap = await getDoc(itemCollectionRef);
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

export const saveItem = async (
    e,
    itemImageUpload,
    itemsData,
    itemNameHasError,
    itemTypeHasError,
    descriptionHasError,
    quantityHasError,
    priceHasError,
    discountHasError,
    material,
    category,
    setMaterialHasError,
    setCategoryHasError,
    setIsModalOpen,
    setModalObject
) => {
    e.preventDefault();

    if (category === '') {
        setCategoryHasError(true);
        setIsModalOpen(true);
        setModalObject({ message: 'Артикулът не е записан! Моля попълнете коректно всички полета!', type: 'error' });
        return;
    } else {
        setCategoryHasError(false);
    }

    if (material === '') {
        setMaterialHasError(true);
        setIsModalOpen(true);
        setModalObject({ message: 'Артикулът не е записан! Моля попълнете коректно всички полета!', type: 'error' });
        return;
    } else {
        setMaterialHasError(false);
    }

    if (itemNameHasError || itemTypeHasError || descriptionHasError || quantityHasError || priceHasError || discountHasError) {
        setIsModalOpen(true);
        setModalObject({ message: 'Артикулът не е записан! Моля попълнете коректно всички полета!', type: 'error' });
        return;
    }

    const imageRef = ref(storage, `images/items/${v4() + itemImageUpload.name}`);

    if (itemImageUpload === '') {
        e.target.value = '';
        setModalObject({ message: 'Изображението не е качено!', type: 'error' });
        return;
    }

    await uploadBytes(imageRef, itemImageUpload).then(() => {
        getDownloadURL(imageRef).then((url) => {
            const itemsCollectionRef = collection(db, 'items');
            addDoc(itemsCollectionRef, { ...itemsData, imageUrl: url, dateCreated: new Date() });

            setIsModalOpen(true);
            setModalObject({ message: 'Продуктът е записан успешно!', type: 'information' });
        });
    });

    e.target.reset();
}

export const updateItem = async (e, id, values, setIsModalOpen, setModalObject) => {
    e.preventDefault();

    const itemDoc = doc(db, 'items', id);

    try {
        await updateDoc(itemDoc, values);
    } catch (error) {
        setIsModalOpen(true);
        setModalObject({ message: 'Артикулът не е обновен!', type: 'error' });
    }
}

export const getNewItems = async () => {
    const itemsCollectionRef = collection(db, "items");
    const response = await getDocs(itemsCollectionRef);
    const data = response.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    const newItems = data.filter(item => item.isNew)
    return newItems;
}

export const getDiscountedItems = async () => {
    const itemsCollectionRef = collection(db, "items");
    const response = await getDocs(itemsCollectionRef);
    const data = response.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    const discountedItems = data.filter(item => item.hasDiscount)
    return discountedItems;
}

export const getAllItems = async () => {
    const itemsCollectionRef = collection(db, "items");
    const response = await getDocs(itemsCollectionRef);
    const data = response.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
}

export const getItemsByCategory = async (categoryName) => {
    const itemsCollectionRef = collection(db, "items");
    const response = await getDocs(itemsCollectionRef);
    const data = response.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));

    const itemsByCategory = data.filter(item => item.categoryName === categoryName)
    return itemsByCategory;
}


export const getItemsByIds = async (ids) => {
    const itemsCollectionRef = collection(db, `items/${ids}`);
    const response = await getDocs(itemsCollectionRef);
    const data = response.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
}

// Form Validations
export const validateName = (e, setItemNameHasError) => {
    if (e.target.value.length < 3) {
        setItemNameHasError(true);
    } else {
        setItemNameHasError(false);
    }
}

export const validateType = (e, setItemTypeHasError) => {
    if (e.target.value.length < 3) {
        setItemTypeHasError(true);
    } else {
        setItemTypeHasError(false);
    }
}

export const validateDescription = (e, setDescriptionHasError) => {
    if (e.target.value.length < 10 || e.target.value.length > 200) {
        setDescriptionHasError(true);
    } else {
        setDescriptionHasError(false);
    }
}

export const validateQuantity = (e, setQuantityHasError) => {
    if (e.target.value <= 0) {
        setQuantityHasError(true);
    } else {
        setQuantityHasError(false);
    }
}

export const validatePriceAndDiscount = (e, setPriceHasError, setDiscountHasError, price, discount) => {
    if (price <= 0 && e.target.name==='price') {
        setDiscountHasError(false);
        setPriceHasError(true);
    } else {
        setPriceHasError(false);
    }

    if (price <= discount) {
        setDiscountHasError(true);
    } else {
        setDiscountHasError(false);
    }
}