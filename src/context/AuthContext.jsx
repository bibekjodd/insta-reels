import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup() {
        const authProvider = new GoogleAuthProvider();
        return signInWithRedirect(auth, authProvider);
    }

    function login() {
        const authProvider = new GoogleAuthProvider();
        signInWithRedirect(auth, authProvider);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userCredintial) => {
            setUser(userCredintial);
            setLoading(false);
        });
        return unsubscribe;
    }, []);


    const store = {
        user,
        signup,
        login,
        logout,
        loading,
    }
    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AuthContext);
}

export { useGlobalContext }