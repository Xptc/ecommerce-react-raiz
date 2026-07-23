import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxYz1234567890abcdef...", // <- Copiado de Firebase
  authDomain: "productos-de-oxapampa.firebaseapp.com",
  projectId: "productos-de-oxapampa",
  storageBucket: "productos-de-oxapampa.appspot.com",
  messagingSenderId: "123456789012", // <- Copiado de Firebase (solo números)
  appId: "1:123456789012:web:abc123def456" // <- Copiado de Firebase
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);