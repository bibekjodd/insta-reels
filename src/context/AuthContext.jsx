import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);

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


    useEffect(() => {
        const collRef = collection(db, 'posts');
        onSnapshot(query(collRef, orderBy('createdAt', 'desc')), snapshot => {
            setPosts(
                snapshot.docs.map(post => ({
                    id: post.id,
                    ...post.data(),
                })))
        });

    }, [db])


    const store = {
        user,
        signup,
        login,
        logout,
        loading,
        posts,
        modalOpen,
        setModalOpen,
        modalIndex,
        setModalIndex,
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