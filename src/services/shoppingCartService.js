import { db } from "../Firebase";
import { collection, getDoc, setDoc, updateDoc, doc, getDocs } from "firebase/firestore";

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

export const getItemsInCart = async (userId) => {
    const cartItemRef = collection(db, `usersItems/${userId}/cart`);
    try {
        await getDocs(cartItemRef)
        .then((res => {
            const data = res.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
                // console.log(data);
                return data;
        }))
    } catch (error) {
        // TODO modal
    }
}