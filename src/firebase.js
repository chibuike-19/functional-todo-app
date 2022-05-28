import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCdwh9fQUsC5dGhei-ZlXHb6xm0NZnf4jY',
  authDomain: 'my-functional-todoapp-9125b.firebaseapp.com',
  projectId: 'my-functional-todoapp-9125b',
  storageBucket: 'my-functional-todoapp-9125b.appspot.com',
  messagingSenderId: '293307546873' ,
  appId: '1:293307546873:web:c8f4d67a4f7592516f7628' 
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)