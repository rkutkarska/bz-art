import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../Firebase';
import { setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    const value = {
        currentUser,
        register,
        login,
        logout
    }

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password);
            })
            .catch((error) => {
                // TODO Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}