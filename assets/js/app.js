import { observeAuth } from "./services/authService.js";

observeAuth((user) => {

    console.log("Utilisateur :", user);

});