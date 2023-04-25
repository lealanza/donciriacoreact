
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore'
import { getStorage  } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBOEwtbFcccQQuW6wxDUXa23OFrR0mwy3c",
  authDomain: "ciriaco-e59c8.firebaseapp.com",
  projectId: "ciriaco-e59c8",
  storageBucket: "ciriaco-e59c8.appspot.com",
  messagingSenderId: "300531871103",
  appId: "1:300531871103:web:b78e3e469c03367f48be4a",
  measurementId: "G-B2DLZ459Y2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app