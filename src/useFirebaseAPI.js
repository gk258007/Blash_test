

import { db } from "./firebaseConfig";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

export const useFirebaseAPI = () => {
  const collectionName = "appStates";

  const saveStateToFirebase = async (items) => {
    try {
      const docRef = doc(db, collectionName, "state");
      await setDoc(docRef, { items });
    } catch (error) {
      console.error("Error saving state to Firebase:", error);
      throw error;
    }
  };

  const loadStateFromFirebase = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const docSnapshot = querySnapshot.docs.find((doc) => doc.id === "state");
      return docSnapshot ? docSnapshot.data().items : [];
    } catch (error) {
      console.error("Error loading state from Firebase:", error);
      throw error;
    }
  };

  return { saveStateToFirebase, loadStateFromFirebase };
};
