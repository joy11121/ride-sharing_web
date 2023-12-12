// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwVHJr26V6CEVKdE9zYsUDjElrBu00tOk",
  authDomain: "cloud-native-login.firebaseapp.com",
  projectId: "cloud-native-login",
  storageBucket: "cloud-native-login.appspot.com",
  messagingSenderId: "905530536029",
  appId: "1:905530536029:web:8988890c3f24bdb928ddb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvide = new GoogleAuthProvider();
export const fbProvide = new FacebookAuthProvider();