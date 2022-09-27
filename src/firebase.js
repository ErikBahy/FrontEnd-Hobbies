// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsuVxumzecjK5fTr8OnUin3OXGiMJFBss",
  authDomain: "hobbies-chat-app.firebaseapp.com",
  projectId: "hobbies-chat-app",
  storageBucket: "hobbies-chat-app.appspot.com",
  messagingSenderId: "555028581653",
  appId: "1:555028581653:web:5bf8d79069451b7d516d1c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)