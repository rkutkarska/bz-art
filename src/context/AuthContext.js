import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    console.log(currentUser);

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
        return signInWithEmailAndPassword(auth, email, password);
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