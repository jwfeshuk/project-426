import Rebase from 're-base';
import firebase from 'firebase';

// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
// };

const config = {
    apiKey: "AIzaSyB4jU8ikTlVh5DnCGK6OeeDq2TLjKXbPw0",
    authDomain: "comp426-final-25d9a.firebaseapp.com",
    databaseURL: "https://comp426-final-25d9a.firebaseio.com",
    projectId: "comp426-final-25d9a",
    storageBucket: "comp426-final-25d9a.appspot.com",
    messagingSenderId: "60674146911",
    appId: "1:60674146911:web:30cb2eb56d4facdfc591ea",
    measurementId: "G-38FFJ6LRHF"
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
// const facebookProvider = new firebase.auth.FacebookAuthProvider()

export { app, base }