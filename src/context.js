import { useContext, useEffect, useState } from "react"
import React from 'react';
import { db } from "./firebase";
import { auth } from "./firebase";
import { query, getDocs, collection,where, addDoc, } from 'firebase/firestore'
import { sendPasswordResetEmail , GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = React.createContext()

export const AppContext = ({children}) => {
    const [currentUser, setCurrentUser] = useState('')
    const [photo, setPhoto] = useState('')
    const [todos, setTodos] = useState([])
   

    const logOut = () => {
        return signOut(auth)
    }
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const sendPasswordReset = async (email) => {
        await sendPasswordResetEmail(auth, email);
    };
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          displayName: user.username || null ,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
    }
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])


    return (
        <AuthContext.Provider value={{currentUser, login, signInWithGoogle, logOut, photo, setPhoto, sendPasswordReset, todos, setTodos}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}