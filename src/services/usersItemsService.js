import { db } from "../Firebase";
import { collection, getDoc, setDoc, updateDoc, doc, getDocs, addDoc, deleteDoc } from "firebase/firestore";

const usersItemsCollectionRef = collection(db, "usersItems");

export const addToCart = async (e, userId, itemId, itemQty) => {
    e.preventDefault();

    const cartItemRef = doc(db, `usersItems/${userId}/cart`, itemId);

    try {
        const docSnap = await getDoc(cartItemRef);

        if (docSnap.exists()) {
            itemQty = Number(itemQty) + Number(docSnap.data().quantity);
            await updateDoc(cartItemRef, { quantity: Number(itemQty) });

        } else {
            await setDoc(cartItemRef, { quantity: itemQty });
        }
    } catch (error) {
        // TODO modal
        // Артикулът не е добавен в количката!
    }
}

export const updateCartItem = async (userId, itemId, itemQty) => {

    const cartItemRef = doc(db, `usersItems/${userId}/cart`, itemId);

    try {
        await updateDoc(cartItemRef, { quantity: Number(itemQty) });
    } catch {
        // TODO modal
        // Наличноста не е актуализирана!
    }

}

export const getItemsInCart = async (userId) => {
    const cartItemRef = collection(db, `usersItems/${userId}/cart`);

    const response = await getDocs(cartItemRef);
    const data = response.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
}

export const orderItems = async (userId, itemsInCart, totalSum) => {
    const ordersItemRef = collection(db, `usersItems/${userId}/orders`);

    const orderedItems = [];
    itemsInCart.map(item => {
        orderedItems.push({ 'id': item.id, 'desiredQuantity': item.desiredQuantity })
    })

    console.log(orderedItems);
    try {
        await addDoc(ordersItemRef, { ...orderedItems, totalSum });
    } catch (error) {
        console.log(error.code, error.message)
        // TODO modal
        // Грешка! Артикулът не е добавен в количката!
    }
}

export const removeItemFromCart = (itemId, userId, itemsInCart, setItemsInCart) => {
    const itemInCartRef = doc(db, `usersItems/${userId}/cart`, itemId);

    deleteDoc(itemInCartRef)
    deleteItem(itemId, itemsInCart, setItemsInCart);
}

function deleteItem(id, itemsInCart, setItemsInCart) {
    let copy = [...itemsInCart];
    copy = copy.filter((document) => document.id !== id);
    setItemsInCart(copy);
}