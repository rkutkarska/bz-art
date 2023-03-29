import { db } from "../Firebase";
import { collection, getDoc, addDoc, doc } from "firebase/firestore";

const usersItemsCollectionRef = collection(db, "usersItems");
// const userId = currentUser.uid;

export const addToCart = async (e, userId, itemId, itemQty) => {
    e.preventDefault();
    console.log('id: ', itemId);
    console.log('quantity: ', itemQty);
    // TODO implement add to shopping cart

    // const cartItemRef = collection(db, `usersItems/${userId}/cart`);

    // const cartIDtemRef = doc(db, `usersItems/${userId}/cart`, itemId);

    // try {
    //     const docSnap = await getDoc(cartIDtemRef);

    //     if (docSnap.exists()) {
    //         // await updateDoc(cartItem, values);
    //         console.log(docSnap.data());

    //     } else {
    //         console.log(docSnap.data());
    //         await addDoc(cartItemRef, {})
    //         // await addDoc(cartItemRef, {}).then( () =>
    //         //     addDoc (cartIDtemRef, {quantity: itemQty})
    //         // );
    //     }
    // } catch (error) {
    //     // TODO modal
    // }
}