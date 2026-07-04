document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');

  if (!form || !input || !messages) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = value;
    messages.appendChild(userMessage);

    const assistantMessage = document.createElement('div');
    assistantMessage.className = 'message assistant';
    assistantMessage.textContent = 'Merci pour votre message. Un conseiller vous répondra bientôt.';
    messages.appendChild(assistantMessage);

    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  });
});
