import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getAuth}  from "firebase/auth";
import {initializeFirestore} from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
// import { firebaseApp } from "./firebase"
// import firebase from 'firebase/app'
// import 'firebase/firestore'

// // v9 compat packages are API compatible with v8 code
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  databaseURL: 'https://{women-era}.firebaseio.com',
    apiKey: "AIzaSyCBhy8WF5Iy3G_DHvKYoVKxdZ8XgUok6vI",
    authDomain: "women-era.firebaseapp.com",
    databaseURL: "https://women-era-default-rtdb.firebaseio.com",
    projectId: "women-era",
    storageBucket: "women-era.appspot.com",
    messagingSenderId: "214559236859",
    appId: "1:214559236859:web:346a55276167f0c2cac65e"
  };

const app = initializeApp(firebaseConfig);
// firestore().settings({ experimentalForceLongPolling: true });
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
// export const db = getFirestore(app);
export { db,auth}