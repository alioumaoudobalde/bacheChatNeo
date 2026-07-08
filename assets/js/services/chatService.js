//assets/js/services/chatService.js

import { db } from "../../../firebase/firebase-config.js";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

export async function sendMessage({
  texte,
  canal,
  user,
  profile,
}) {
  return await addDoc(collection(db, "messages"), {
    texte: texte.trim(),
    canal,
    expediteurId: user.uid,
    expediteurNom:
      profile.nomComplet ||
      user.displayName ||
      "Utilisateur",

    expediteurInitiales:
      (profile.nomComplet || "U")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase(),

    expediteurPhoto:
      profile.photoUrl || "",

    timestamp: serverTimestamp(),
    type: "user",
    edited: false,
    deleted: false,
  });
}