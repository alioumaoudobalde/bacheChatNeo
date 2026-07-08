import {

    register,

    login

} from "../services/authService.js";

import { getFirebaseError } from "../utils/firebaseErrors.js";
import {
    getRedirectAfterLogin,
    redirectIfAuthenticated
} from "../guards/authGuard.js";

const registerForm = document.querySelector("#registerForm");

const loginForm = document.querySelector("#loginForm");

let isAuthSubmitting = false;

redirectIfAuthenticated("dashboard.html", () => !isAuthSubmitting);

function showFormError(form, message) {
    const alert = form.closest(".auth-card")?.querySelector(".auth-alert");

    if (!alert) {
        return;
    }

    alert.textContent = message;
    alert.classList.add("is-visible");
}

function clearFormError(form) {
    const alert = form.closest(".auth-card")?.querySelector(".auth-alert");

    if (!alert) {
        return;
    }

    alert.textContent = "";
    alert.classList.remove("is-visible");
}

function setFormLoading(form, isLoading) {
    const button = form.querySelector("button[type='submit']");
    const spinner = form.querySelector(".spinner-border");

    if (button) {
        button.disabled = isLoading;
    }

    if (spinner) {
        spinner.hidden = !isLoading;
    }
}

/**
 * INSCRIPTION
 */

if (registerForm) {

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        clearFormError(registerForm);

        if (!registerForm.checkValidity()) {
            registerForm.reportValidity();
            return;
        }

        const fullName = registerForm.nomComplet.value.trim();

        const email = registerForm.email.value.trim();

        const password = registerForm.password.value;

        const photoFile = registerForm.photo.files[0] || null;

        try {

            isAuthSubmitting = true;

            setFormLoading(registerForm, true);

            await register(
                fullName,
                email,
                password,
            );
            window.location.href = getRedirectAfterLogin("dashboard.html");

        }

        catch (error) {

            showFormError(registerForm, getFirebaseError(error));

        }

        finally {

            setFormLoading(registerForm, false);

            isAuthSubmitting = false;

        }

    });

}

/**
 * CONNEXION
 */

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        clearFormError(loginForm);

        if (!loginForm.checkValidity()) {
            loginForm.reportValidity();
            return;
        }

        const email = loginForm.email.value.trim();

        const password = loginForm.password.value;

        try {

            isAuthSubmitting = true;

            setFormLoading(loginForm, true);

            await login(

                email,

                password

            );

            window.location.href = getRedirectAfterLogin("dashboard.html");

        }

        catch (error) {

            showFormError(loginForm, getFirebaseError(error));

        }

        finally {

            setFormLoading(loginForm, false);

            isAuthSubmitting = false;

        }

    });

}
