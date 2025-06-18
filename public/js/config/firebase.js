// Firebase Configuration and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
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
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytesResumable, 
    getDownloadURL,
    deleteObject 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firebase services
export { 
    auth, 
    db, 
    storage,
    onAuthStateChanged,
    signOut,
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
    
