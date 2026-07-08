import { observeAuth, logout } from "../services/authService.js";

/**
 * Détermine où rediriger après connexion.
 */
export function getRedirectAfterLogin(defaultTarget = "dashboard.html") {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect");

  if (
    redirect &&
    !redirect.includes("://") &&
    !redirect.startsWith("//")
  ) {
    return redirect;
  }

  return defaultTarget;
}

/**
 * Si l'utilisateur est déjà connecté,
 * on le redirige automatiquement.
 */
export function redirectIfAuthenticated(
  target = "dashboard.html",
  canRedirect = () => true,
) {
  return observeAuth((user) => {
    if (!user) {
      return;
    }

    if (canRedirect(user)) {
      window.location.replace(target);
    }
  });
}

/**
 * Protège une page.
 * Si l'utilisateur n'est pas connecté,
 * retour vers login.
 */
export function protectPage({
  onReady,
  redirectTo = "login.html",
} = {}) {
  return observeAuth(async (user) => {
    if (!user) {
      const currentPage =
        window.location.pathname.split("/").pop() ||
        "dashboard.html";

      window.location.replace(
        `${redirectTo}?redirect=${encodeURIComponent(
          currentPage,
        )}`,
      );

      return;
    }

    if (onReady) {
      await onReady(user);
    }
  });
}

/**
 * Initialise tous les boutons de déconnexion.
 */
export function setupLogoutButtons() {
  const buttons = document.querySelectorAll("[data-logout]");

  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();

      button.disabled = true;

      try {
        await logout();

        // Petite attente pour laisser Firebase
        // propager le changement d'état.
        setTimeout(() => {
          window.location.replace("login.html");
        }, 250);

      } catch (error) {
        console.error(error);
        button.disabled = false;
      }
    });
  });
}