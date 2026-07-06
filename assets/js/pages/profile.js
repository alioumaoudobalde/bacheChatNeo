import { avatars } from "../utils/avatars.js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config.js";
import { auth } from "../services/authService.js";

const avatarGrid = document.getElementById("avatarGrid");

avatars.forEach((avatar) => {
  const img = document.createElement("img");

  img.src = avatar;
  img.classList.add("avatar-option");

  img.addEventListener("click", async () => {
    const user = auth.currentUser;

    await updateDoc(doc(db, "users", user.uid), {
      photoUrl: avatar
    });

    alert("Avatar mis à jour !");
  });

  avatarGrid.appendChild(img);
});