import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

// TODO: replace with real config
const firebaseConfig = {
  apiKey: "AIzaSyCKupX1EcNBgRBSYJiOO18FOsbcBgQzs-A",
  authDomain: "crunchers-gym-sync.firebaseapp.com",
  projectId: "crunchers-gym-sync",
  storageBucket: "crunchers-gym-sync.firebasestorage.app",
  messagingSenderId: "1061027011783",
  appId: "1:1061027011783:web:e1b5ad74156dc62567f2e2",
  measurementId: "G-6C5PK4NLEC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { doc, onSnapshot, setDoc, updateDoc, serverTimestamp };
