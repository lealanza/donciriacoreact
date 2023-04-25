
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore'
import { getStorage  } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDKtObvsIJW10bicIKXs2pB64IzaE6_TeI",
  authDomain: "donciriaco-aa312.firebaseapp.com",
  projectId: "donciriaco-aa312",
  storageBucket: "donciriaco-aa312.appspot.com",
  messagingSenderId: "268132177902",
  appId: "1:268132177902:web:a8fe4ee97581819cf4e0ff",
  measurementId: "G-G4168MWZJL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app