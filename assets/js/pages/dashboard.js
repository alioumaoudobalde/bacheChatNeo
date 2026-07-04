import { protectPage, setupLogoutButtons } from "../guards/authGuard.js";
import { getUserProfile } from "../services/firestoreService.js";

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
    image.src = photoUrl;
    image.alt = `Photo de ${name || "profil"}`;
    image.hidden = false;
    fallback.hidden = true;
  }
}

function renderUser(user, profile) {
  const name = profile?.nomComplet || user.displayName || "nouveau bachelier";
  const email = profile?.email || user.email || "";
  const role = profile?.role || "Etudiant";
  const photoUrl = profile?.photoUrl || user.photoURL || "";

  document.querySelector("#welcomeName").textContent = name;
  document.querySelector("#userName").textContent = name;
  document.querySelector("#userEmail").textContent = email;
  document.querySelector("#userRole").textContent = role;

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
