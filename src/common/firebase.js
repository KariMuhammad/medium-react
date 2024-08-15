// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import config from "../config";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

export const handleAuthGoogle = async () => {
  return await signInWithPopup(auth, googleProvider)
    .then((account) => {
      console.log(account);
      return account.user;
    })
    .catch(console.log);
};
