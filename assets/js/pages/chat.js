import {
  protectPage,
} from "../guards/authGuard.js";

import {
  getUserProfile,
} from "../services/firestoreService.js";

import {
  sendMessage,
} from "../services/chatService.js";

let currentUser = null;
let currentProfile = null;

protectPage({
  async onReady(user) {

    currentUser = user;

    currentProfile = await getUserProfile(user.uid);

    initializeChat();

  },
});

function initializeChat() {

  const form = document.getElementById("chatForm");

  const input = document.getElementById("chatInput");

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const texte = input.value.trim();

    if (!texte) return;

    const activeTab = document.querySelector(".chat-tab.active");

    let canal = "general";

    if (activeTab) {

      if (activeTab.id === "tab-orientation")
        canal = "orientation";

      if (activeTab.id === "tab-bourses")
        canal = "bourses";

    }

    try {

      await sendMessage({

        texte,

        canal,

        user: currentUser,

        profile: currentProfile,

      });

      input.value = "";

      input.focus();

    }

    catch (error) {
    console.error("Erreur :", error);
    console.error("Code :", error.code);
    console.error("Message :", error.message);

    alert(error.code + "\n\n" + error.message);
    }

  });

}