import { observeAuth, logout } from "../services/authService.js";

export function getRedirectAfterLogin(defaultTarget = "dashboard.html") {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect");

  if (redirect && !redirect.includes("://") && !redirect.startsWith("//")) {
    return redirect;
  }

  return defaultTarget;
}

export function redirectIfAuthenticated(target = "dashboard.html", canRedirect = () => true) {
  return observeAuth((user) => {
    if (user && canRedirect(user)) {
      window.location.replace(target);
    }
  });
}

export function protectPage({ onReady, redirectTo = "login.html" } = {}) {
  return observeAuth(async (user) => {
    if (!user) {
      const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";
      window.location.replace(`${redirectTo}?redirect=${encodeURIComponent(currentPage)}`);
      return;
    }

    if (onReady) {
      await onReady(user);
    }
  });
}

export function setupLogoutButtons() {
  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      await logout();
      window.location.href = "login.html";
    });
  });
}
