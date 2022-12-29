import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyBwk0UsMEpys94beL9QLR9hRmZIC0g4KnI",
    authDomain: "bookify-acaf9.firebaseapp.com",
    projectId: "bookify-acaf9",
    storageBucket: "bookify-acaf9.appspot.com",
    messagingSenderId: "156673170521",
    appId: "1:156673170521:web:da68d735da087c5f7aa548"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
    }, []);

    const signUpUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password);
    const signInUserWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);
    const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    const handleCreateNewListing = async (bookName, bookIsbnNumber, bookImage, bookPrice) => {
        const imageRef = (ref(storage, `uploads/images/${Date.now()}-${bookImage.name}`));
        const uploadResult = await uploadBytes(imageRef, bookImage);
        return await addDoc(collection(firestore, 'books'), {
            bookName,
            bookIsbnNumber,
            bookPrice,
            imageURL: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        });
    };

    const listAllBooks = () => {
        return getDocs(collection(firestore, "books"));
    };

    const getBookById = async (id) => {
        const documentRefer = doc(firestore, "books", id);
        const result = await getDoc(documentRefer);
        return result;
    };

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path))
    };

    const placeOrder = async (bookId, qty) => {
        const collaectionRefer = collection(firestore, "books", bookId, "orders");
        const result = await addDoc(collaectionRefer, {
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty: Number(qty),
        });
        return result;
    };

    const fetchMyBooks = async (userId) => {
        const collectionRef = collection(firestore, "books");
        const q = query(collectionRef, where("userID", "==", userId));
        const result = await getDocs(q);
        return result;
    };

    const getOrders = async (bookId) => {
        const collectionRef = collection(firestore, "books", bookId, "orders");
        const result = await getDocs(collectionRef);
        return result;
    }

    const isLoggedIn = user ? true : false;



    return (
        <FirebaseContext.Provider value={{ signUpUserWithEmailAndPassword, signInUserWithEmailAndPassword, signInWithGoogle, isLoggedIn, handleCreateNewListing, listAllBooks, getImageURL, getBookById, placeOrder, fetchMyBooks, user, getOrders }}>
            {props.children}
        </FirebaseContext.Provider>
    );
}