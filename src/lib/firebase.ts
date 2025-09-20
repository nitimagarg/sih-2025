
import { initializeApp, getApps, getApp, FirebaseError } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut as firebaseSignOut, getRedirectResult } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0EyXBO_P22bvzsAInIO0dok1T3lvBbxw",
  authDomain: "studio-4676698599-82985.firebaseapp.com",
  projectId: "studio-4676698599-82985",
  storageBucket: "studio-4676698599-82985.firebasestorage.app",
  messagingSenderId: "236938280738",
  appId: "1:236938280738:web:d65c4b24a150edb3562f7b"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    console.log("Attempting sign-in with popup...");
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Sign-in with popup successful:", result);
    return result;
  } catch (error: any) {
    console.error("Popup sign-in error code:", error.code);
    console.error("Full popup sign-in error:", error);
    // If the popup is blocked, use redirect as a fallback
    if (error instanceof FirebaseError && (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request')) {
      console.log("Popup blocked, falling back to redirect...");
      await signInWithRedirect(auth, googleProvider);
      // The page will redirect, so the promise may not resolve here.
      // The result is handled on page load with getRedirectResult.
      return null;
    }
    // Re-throw other errors to be caught by the UI
    throw error;
  }
};


export const signOut = () => {
  return firebaseSignOut(auth);
};

export { auth, getRedirectResult };
