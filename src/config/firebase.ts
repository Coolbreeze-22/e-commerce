import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

const apiKey: string = import.meta.env.VITE_API_KEY;
const authDomain: string = import.meta.env.VITE_AUTH_DOMAIN;
const projectId: string = import.meta.env.VITE_PROJECT_ID;
const storageBucket: string = import.meta.env.VITE_STORAGE_BUCKET;
const messagingSenderId: string = import.meta.env.VITE_MESSAGING_SENDER_ID;
const appId: string = import.meta.env.VITE_APP_ID;
const measurementId: string = import.meta.env.VITE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

export {
  fireStore,
  auth,
  storage,
  messaging,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  deleteUser,
  onAuthStateChanged,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
};
