import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";


const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    const value = {
        currentUser,
        register
    }

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
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