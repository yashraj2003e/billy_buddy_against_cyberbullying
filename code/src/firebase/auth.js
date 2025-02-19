import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

export async function doCreateUserWithEmailAndPassword(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function doSignInWithEmailAndPassword(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function doSignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
}

export function doSignOut() {
  return auth.signOut();
}
