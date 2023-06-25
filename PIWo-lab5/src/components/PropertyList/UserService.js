import { auth } from "./init";
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import{ useState, useEffect } from "react";

const googleProvider = new GoogleAuthProvider();

export const logInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    }catch(err) {
        console.error({ err });
        alert(err.message);
    }
};

const provider = new FacebookAuthProvider();

export const logInWithFacebook = async () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
};

export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe =
                auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);
    return user;
};

export const logout = () => signOut(auth);
