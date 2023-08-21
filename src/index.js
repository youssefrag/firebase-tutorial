import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNCnyNrqAabPOJKs5X3lvMvUn-aXj1R5c",
  authDomain: "fir-9-dojo-f67aa.firebaseapp.com",
  projectId: "fir-9-dojo-f67aa",
  storageBucket: "fir-9-dojo-f67aa.appspot.com",
  messagingSenderId: "42178163007",
  appId: "1:42178163007:web:f93cd00de7d8d99f4b238a",
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// get collection data
getDocs(colRef)
  .then((snapshpt) => {
    let books = [];
    snapshpt.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => console.log(err));
