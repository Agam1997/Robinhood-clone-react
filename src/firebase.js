import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAWqJjvsaOjQ4calKa4iuDokabRY9rQKsY",
    authDomain: "robinhood-c999a.firebaseapp.com",
    projectId: "robinhood-c999a",
    storageBucket: "robinhood-c999a.appspot.com",
    messagingSenderId: "163172233732",
    appId: "1:163172233732:web:c1a78265b9b26217ecbb51"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();

  export { db }