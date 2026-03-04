// Step 1: Create Firebase project in console
// Step 2: Install SDK
// npm install firebase

// Step 3: Initialize
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, onSnapshot,
  setDoc, updateDoc, deleteDoc, query, where,
  orderBy, limit } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged } from 'firebase/auth'

const app = initializeApp({
  apiKey: "AIzaSy...",
  authDomain: "my-app.firebaseapp.com",
  projectId: "my-app",
  storageBucket: "my-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
})

const db = getFirestore(app)
const auth = getAuth(app)

// Step 4: Set up security rules in Firebase console
// Step 5: Set up authentication providers
// Step 6: Write CRUD operations for each collection
// Step 7: Handle offline with enablePersistence()
// Step 8: Set up Cloud Functions for server logic
// Step 9: Deploy
// Step 10: Pay monthly bills
