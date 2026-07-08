// assets/js/pages/faq.js

import {
  protectPage,
  setupLogoutButtons,
} from "../guards/authGuard.js";

/**
 * Initialise les interactions de la FAQ.
 */
function initializeFaq() {
  const details = document.querySelectorAll("details");

  details.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      details.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    });
  });
}

/**
 * Protection de la page.
 */
protectPage({
  async onReady() {
    setupLogoutButtons();

    initializeFaq();
  },
});