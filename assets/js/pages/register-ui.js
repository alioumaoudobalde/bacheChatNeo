/**
 * register-ui.js
 * Interactions purement visuelles de la page d'inscription :
 * - aperçu de la photo de profil sélectionnée
 * - affichage / masquage du mot de passe
 *
 * Ce fichier ne contient AUCUNE logique métier (pas d'appel Firebase/API).
 * L'inscription elle-même est gérée par assets/js/pages/auth.js.
 */

// ---- Aperçu photo de profil ----
const photoInput = document.getElementById("photo");
const photoUploadBtn = document.getElementById("photoUploadBtn");
const photoPreview = document.getElementById("photoPreview");
const photoIcon = document.getElementById("photoIcon");

if (photoUploadBtn && photoInput) {
  photoUploadBtn.addEventListener("click", () => photoInput.click());

  photoInput.addEventListener("change", () => {
    const file = photoInput.files && photoInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.src = e.target.result;
      photoPreview.hidden = false;
      photoIcon.hidden = true;
    };
    reader.readAsDataURL(file);
  });
}

// ---- Affichage / masquage du mot de passe ----
const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("togglePassword");
const toggleIcon = document.getElementById("togglePasswordIcon");

if (toggleBtn && passwordInput) {
  toggleBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleBtn.setAttribute("aria-pressed", String(isHidden));
    toggleIcon.classList.toggle("bi-eye-slash-fill", !isHidden);
    toggleIcon.classList.toggle("bi-eye-fill", isHidden);
  });
}