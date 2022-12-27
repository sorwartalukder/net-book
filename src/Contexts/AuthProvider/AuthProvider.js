import { createContext, useEffect, useState } from "react";
import { getAuth } from 'firebase/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import app from "../../Firebase/Firebase.config";


export const AuthContext = createContext()
const auth = getAuth(app

)
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            setLoading(false)
            setUser(currentUser)
        });
        return () => unsubscribe();
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        logIn,
        loginWithGoogle,
        updateUserProfile,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;