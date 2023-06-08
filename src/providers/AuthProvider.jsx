import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // const savedUser = { name: 'Shiam' };
            // // const savedUser = { name: user?.displayName, email: user?.email };
            // if(savedUser) {
            //     fetch('http://localhost:5000/users', {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(savedUser)
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         setUser(data);
            //     })
            // }
            setLoading(false);
            setUser(user);
        })
        return () => unsubscribe();
    }, [])

    const logOut = () => {
        return signOut(auth);
    }

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    const authInfo = {
        googleLogin, login, signUp, logOut, user, updateUserProfile, loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;