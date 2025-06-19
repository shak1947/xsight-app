// Firebase Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { 
    getFirestore, 
    collection, 
    query, 
    onSnapshot, 
    addDoc, 
    doc, 
    deleteDoc,
    getDocs, 
    setDoc,
    updateDoc, 
    arrayUnion, 
    arrayRemove 
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import {
    getStorage,
    ref,
    uploadBytesResumable, 
    getDownloadURL,
    deleteObject 
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDViu75v5HVVmHH3UsieytGMduXoAXLBao",
    authDomain: "xsight-f1b47.firebaseapp.com",
    projectId: "xsight-f1b47",
    storageBucket: "xsight-f1b47.firebasestorage.app",
    messagingSenderId: "1070514994227",
    appId: "1:1070514994227:web:ae8e902ff36d84bd77b746",
    measurementId: "G-ZY2WQNWDR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export Firebase methods for use in other modules
export {
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    collection,
    query,
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    getDocs,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject
};

// Log successful initialization
console.log('✅ Firebase initialized successfully');

// Export the app instance if needed
export default app;
