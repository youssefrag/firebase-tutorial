import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

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

// quries
const q = query(colRef, where("author", "==", "patrick rothfuss"));
// const q = query(colRef, where("title", "==", "the name of the wind"));

// real time collection data
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
