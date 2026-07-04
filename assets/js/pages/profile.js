document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const status = document.querySelector('[data-profile-status]');

    if (status) {
      status.textContent = 'Profil enregistre.';
    }
  });
});
