

// Adresse du back à modifier selon le contexte (localhost ou déploiement)
const BACK_URL = 'https://back-archiapp.onrender.com';

// Fonction pour charger les messages depuis le back
function fetchAndDisplayMessages() {
    fetch(BACK_URL + '/msg/getAll')
        .then(response => response.json())
        .then(messages => {
            update(messages);
        });
}

// Affiche la liste des messages (tableau de strings)
function update(messages) {
    const ul = document.getElementById('messages-list');
    ul.innerHTML = '';
    messages.forEach(function(m) {
        const li = document.createElement('li');
        li.textContent = m;
        ul.appendChild(li);
    });
}

// Bouton "Mise à jour" pour recharger les messages
document.getElementById('update-btn').addEventListener('click', function() {
    fetchAndDisplayMessages();
});

// Bouton "Envoyer" pour poster un message
document.getElementById('send-btn').addEventListener('click', function() {
    const textarea = document.getElementById('new-message');
    const msg = textarea.value.trim();
    if (msg.length === 0) return;
    // Encodage pour l'URL
    const url = BACK_URL + '/msg/post/' + encodeURIComponent(msg);
    fetch(url)
        .then(response => response.json())
        .then(() => {
            textarea.value = '';
            fetchAndDisplayMessages();
        });
});

// Chargement initial des messages
fetchAndDisplayMessages();
updateDetailed(msgs);

// --- Changement de style clair/sombre ---
document.getElementById('toggle-style').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
