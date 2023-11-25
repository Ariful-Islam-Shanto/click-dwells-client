import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.config';
import useAxiosSecure from '../hooks/useAxiosSecure';



export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure()
    
    
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
   
    const userLogIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    
    const googleProvider = new GoogleAuthProvider();

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    const githubProvider = new GithubAuthProvider();

    const githubLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider);
    }

    
    const facebookProvider = new FacebookAuthProvider();

    const facebookLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, facebookProvider);
    }

   
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }


    //? Observe auth state change (get the currently signed-in user)
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);

            if(currentUser) {
                const email = currentUser.email;
                const loggedUser = { email : email };
                console.log(loggedUser);
                axiosSecure.post('/jwt', loggedUser)
                .then(res => {
                    console.log(res.data);
                })
            }else {
                axiosSecure.post('/logout', {email : user?.email})
                .then(res => {
                    console.log(res.data);
                })
            }
        })

        return () => {
            unSubscribe();
        }
    },[axiosSecure])

    const authInfo = {user,loading, createUser, userLogIn, githubLogin, googleLogin, facebookLogin, logOut};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;