// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKIbI4FxNSCFFNsocs9TNC4c9_SNa9i94",
  authDomain: "authen-e6c4d.firebaseapp.com",
  projectId: "authen-e6c4d",
  storageBucket: "authen-e6c4d.appspot.com",
  messagingSenderId: "471558320734",
  appId: "1:471558320734:web:ac0f1c2bdfacf9a19334ea",
};

// Initialize Firebase
console.log("Initializing Firebase with config:", firebaseConfig);
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized successfully");

const auth = getAuth(app);
console.log("Auth initialized:", auth);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };
export default app;
