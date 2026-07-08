// assets/js/pages/profile.js

import {
  protectPage,
  setupLogoutButtons,
} from "../guards/authGuard.js";
/**
 * Initialisation de la page Profil.
 *
 * Le contenu sera développé lors du Sprint Profil.
 */
function initializeProfile() {
  console.log("Profil prêt.");
}

protectPage({
  async onReady() {
    setupLogoutButtons();

    initializeProfile();
  },
});