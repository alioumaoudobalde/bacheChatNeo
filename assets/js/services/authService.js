import { auth, storage } from "../../../firebase/firebase-config.js";

import {
  createUserProfile,
  updateUserPresence,
  updateUserProfileFields,
} from "./firestoreService.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

async function uploadProfilePhoto(user, photoFile) {
  if (!photoFile) {
    return "";
  }

  const extension = photoFile.name.split(".").pop() || "jpg";
  const photoRef = ref(storage, `users/${user.uid}/profile-${Date.now()}.${extension}`);

  await uploadBytes(photoRef, photoFile);

  return getDownloadURL(photoRef);
}

/**
 * Création d'un compte
 */
export async function register(fullName, email, password, photoFile = null) {
  const credential = await createUserWithEmailAndPassword(
    auth,

    email,

    password,
  );

  await updateProfile(credential.user, {
    displayName: fullName,
  });

  await createUserProfile(
    credential.user,

    fullName,
  );

  if (photoFile) {
    try {
      const photoUrl = await uploadProfilePhoto(credential.user, photoFile);

      await updateProfile(credential.user, {
        displayName: fullName,
        photoURL: photoUrl,
      });

      await updateUserProfileFields(credential.user.uid, { photoUrl });
    } catch (error) {
      console.warn("La photo de profil n'a pas pu etre enregistree.", error);
    }
  }

  return credential.user;
}

/**
 * Connexion
 */

export async function login(email, password) {
  const credential = await signInWithEmailAndPassword(
    auth,

    email,

    password,
  );

  await updateUserPresence(credential.user, true);

  return credential.user;
}

/**
 * Déconnexion
 */

export async function logout() {
  const user = auth.currentUser;

  try {
    if (user) {
      await updateUserPresence(user, false);
    }
  } finally {
    await signOut(auth);
  }
}

/**
 * Etat utilisateur
 */

export function observeAuth(callback) {
  return onAuthStateChanged(
    auth,

    callback,
  );
}
