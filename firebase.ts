// Firebase client setup for Next.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCeQfC-3JqjJXjwqI_1KiuuFWMxZg7TA_E",
  authDomain: "fabulinus-1012.firebaseapp.com",
  projectId: "fabulinus-1012",
  storageBucket: "fabulinus-1012.firebasestorage.app",
  messagingSenderId: "913941186852",
  appId: "1:913941186852:web:7fa762510a56e83f900bb1",
  measurementId: "G-FRJ46RD027"
};

// Prevent re-initialization on hot reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
