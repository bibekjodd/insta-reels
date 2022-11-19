import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC4gjahVQnvU7_8t7d6O8tKUShGg5F11Hc",
    authDomain: "reels-clone-x.firebaseapp.com",
    projectId: "reels-clone-x",
    storageBucket: "reels-clone-x.appspot.com",
    messagingSenderId: "658843049895",
    appId: "1:658843049895:web:66d1501053a5503029a082"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage=getStorage(app);

export { auth, db,storage }