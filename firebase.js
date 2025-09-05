import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// COLAR AQUI A STRING DE CONEXÃO
const firebaseConfig = {
  apiKey: "AIzaSyB2ND0mBK_SQcFKiiaXkB8w8okFwar8QqM",
  authDomain: "chave-ccf0d.firebaseapp.com",
  projectId: "chave-ccf0d",
  storageBucket: "chave-ccf0d.firebasestorage.app",
  messagingSenderId: "928357780284",
  appId: "1:928357780284:web:439ef96e2f57c156cb2c39",
  measurementId: "G-9HXC8FH37X"
};
  
  
// INICIALIZAR O FIREBASE
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