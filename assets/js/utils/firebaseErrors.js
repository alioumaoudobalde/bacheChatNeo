const firebaseErrorMessages = {
  "auth/email-already-in-use": "Cette adresse e-mail est deja utilisee.",
  "auth/invalid-email": "Adresse e-mail invalide.",
  "auth/invalid-credential": "Email ou mot de passe incorrect.",
  "auth/user-not-found": "Aucun compte trouve avec cette adresse e-mail.",
  "auth/wrong-password": "Mot de passe incorrect.",
  "auth/weak-password": "Le mot de passe doit contenir au moins 6 caracteres.",
  "auth/missing-password": "Veuillez saisir votre mot de passe.",
  "auth/network-request-failed": "Connexion internet indisponible. Reessayez.",
  "storage/unauthorized": "L'envoi de la photo n'est pas autorise pour le moment.",
  "storage/retry-limit-exceeded": "L'envoi de la photo a pris trop de temps. Reessayez.",
};

export function getFirebaseError(error) {
  const code = typeof error === "string" ? error : error?.code;

  return firebaseErrorMessages[code] || "Une erreur est survenue. Reessayez.";
}
