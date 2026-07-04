import { protectPage, setupLogoutButtons } from "../guards/authGuard.js";

protectPage({
  onReady() {
    setupLogoutButtons();
  },
});
