// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg8CJCPXuhdm5oVVtnSuQFVIJFJcek-k8",
  authDomain: "netflixxx-gpt.firebaseapp.com",
  projectId: "netflixxx-gpt",
  storageBucket: "netflixxx-gpt.appspot.com",
  messagingSenderId: "751814078807",
  appId: "1:751814078807:web:c8b8c9f0dd89d63ad70e12",
  measurementId: "G-X1EDZPX2ZR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
