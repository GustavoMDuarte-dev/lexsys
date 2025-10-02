import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAOHHhiBpXGjd6rpRTH7YZghY8nYeZpFbY",
  authDomain: "lexsys-app.firebaseapp.com",
  projectId: "lexsys-app",
  storageBucket: "lexsys-app.firebasestorage.app",
  messagingSenderId: "814181731943",
  appId: "1:814181731943:web:95acb43e61ead40425cec2"
};
  
  

let app;
if (firebase.apps.length == 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export { auth, firestore, storage };