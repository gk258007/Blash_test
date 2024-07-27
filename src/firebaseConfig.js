

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDLRC-KSCISk2yNAibHrWyRebDCjeVqkRc",
  authDomain: "test-4c935.firebaseapp.com",
  projectId: "test-4c935",
  storageBucket: "test-4c935.appspot.com",
  messagingSenderId: "155239351564",
  appId: "1:155239351564:web:83330a66ae480498e03529"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
