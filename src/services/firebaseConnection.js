import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBapCXXAenNwkA-2wvHD8S1t-AcRaz03JQ",
    authDomain: "sistemachamado-d2246.firebaseapp.com",
    projectId: "sistemachamado-d2246",
    storageBucket: "sistemachamado-d2246.appspot.com",
    messagingSenderId: "973899947568",
    appId: "1:973899947568:web:fa98f1084714148c4317f5",
    measurementId: "G-3SXLH4EQ9M"
  };
  
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)