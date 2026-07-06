import { protectPage, setupLogoutButtons } from "../guards/authGuard.js";
import {
  getUserProfile,
  updateUserProfileFields,
} from "../services/firestoreService.js";

function getFirstName(name, email) {
  const source = name || email || "ami";

  return source.split(" ")[0];
}

function getInitials(name, email) {
  const source = name || email || "Utilisateur";

  return source
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function renderAvatar(photoUrl, name, email) {
  const image = document.querySelector("#userPhoto");
  const fallback = document.querySelector("#userInitials");

  if (!image || !fallback) {
    return;
  }

  fallback.textContent = getInitials(name, email);

  if (photoUrl) {
    image.alt = `Photo de ${name || "profil"}`;
    image.onload = () => {
      image.hidden = false;
      fallback.hidden = true;
    };
    image.onerror = () => {
      image.hidden = true;
      fallback.hidden = false;
    };
    image.src = photoUrl;
  } else {
    image.hidden = true;
    fallback.hidden = false;
  }
}

function renderUser(user, profile) {
  const name = profile?.nomComplet || user.displayName || "";
  const email = profile?.email || user.email || "";
  const photoUrl = profile?.photoUrl || profile?.photoURL || user.photoURL || "";
  const welcomeName = document.querySelector("#welcomeName");

  if (welcomeName) {
    welcomeName.textContent = getFirstName(name, email);
  }

  if (!profile?.photoUrl && user.photoURL) {
    updateUserProfileFields(user.uid, { photoUrl: user.photoURL }).catch((error) => {
      console.warn("Impossible de synchroniser la photo de profil.", error);
    });
  }

  renderAvatar(photoUrl, name, email);
}

protectPage({
  async onReady(user) {
    setupLogoutButtons();

    let profile = null;

    try {
      profile = await getUserProfile(user.uid);
    } catch (error) {
      console.error("Impossible de charger le profil Firestore.", error);
    }

    renderUser(user, profile);
  },
});
