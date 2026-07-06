import { db } from "../../../firebase/firebase-config.js";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const DEFAULT_ROLE = "Étudiant";

/**
 * Création du profil utilisateur
 */
export async function createUserProfile(
  user,
  fullName,
  photoUrl,
) {
  await setDoc(
    doc(db, "users", user.uid),
    {
      nomComplet: fullName,
      email: user.email,
      photoUrl,
      role: DEFAULT_ROLE,
      dateCreation: serverTimestamp(),
      lastLogin: serverTimestamp(),
      isOnline: true,
    },
    { merge: true },
  );
}

/**
 * Lecture du profil
 */
export async function getUserProfile(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

/**
 * Mise à jour partielle du profil
 */
export async function updateUserProfileFields(uid, fields) {
  await setDoc(
    doc(db, "users", uid),
    fields,
    { merge: true },
  );
}

/**
 * Réparation automatique d'un profil incomplet
 */
function getRepairData(user, profile) {
  const repairData = {};

  if (!profile?.nomComplet) {
    repairData.nomComplet =
      user.displayName ||
      user.email ||
      "Utilisateur";
  }

  if (!profile?.email && user.email) {
    repairData.email = user.email;
  }

  if (!profile?.photoUrl) {
    repairData.photoUrl =
      user.photoURL ||
      "";
  }

  if (!profile?.role) {
    repairData.role = DEFAULT_ROLE;
  }

  if (!profile?.dateCreation) {
    repairData.dateCreation = serverTimestamp();
  }

  return repairData;
}

/**
 * Présence utilisateur
 */
export async function updateUserPresence(
  user,
  isOnline,
) {
  const userRef = doc(db, "users", user.uid);

  const snapshot = await getDoc(userRef);

  const profile =
    snapshot.exists()
      ? snapshot.data()
      : null;

  const data = {
    isOnline,
  };

  if (isOnline) {
    data.lastLogin = serverTimestamp();
  } else {
    data.lastLogout = serverTimestamp();
  }

  await setDoc(
    userRef,
    {
      ...getRepairData(user, profile),
      ...data,
    },
    { merge: true },
  );
}

/*
import { db } from "../../../firebase/firebase-config.js";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const DEFAULT_ROLE = "Etudiant";


 
export async function createUserProfile(user, fullName, photoUrl = "") {
  await setDoc(
    doc(db, "users", user.uid),
    {
      nomComplet: fullName,
      email: user.email,
      photoUrl,
      role: DEFAULT_ROLE,
      dateCreation: serverTimestamp(),
      lastLogin: serverTimestamp(),
      isOnline: true,
    },
    { merge: true },
  );
}

export async function getUserProfile(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function updateUserProfileFields(uid, fields) {
  await setDoc(doc(db, "users", uid), fields, { merge: true });
}

function getRepairData(user, profile) {
  const repairData = {};

  if (!profile?.nomComplet) {
    repairData.nomComplet = user.displayName || user.email || "Utilisateur";
  }

  if (!profile?.email && user.email) {
    repairData.email = user.email;
  }

  if (profile?.photoUrl === undefined) {
    repairData.photoUrl = user.photoURL || "";
  }

  if (!profile?.role) {
    repairData.role = DEFAULT_ROLE;
  }

  if (!profile?.dateCreation) {
    repairData.dateCreation = serverTimestamp();
  }

  return repairData;
}

export async function updateUserPresence(user, isOnline) {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  const profile = snapshot.exists() ? snapshot.data() : null;
  const data = { isOnline };

  if (isOnline) {
    data.lastLogin = serverTimestamp();
  } else {
    data.lastLogout = serverTimestamp();
  }

  await setDoc(
    userRef,
    {
      ...getRepairData(user, profile),
      ...data,
    },
    { merge: true },
  );
}
*/
