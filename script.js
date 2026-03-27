

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
    messages.forEach(function(m, i) {
        const li = document.createElement('li');
        li.textContent = m;
        // Les styles de bulle sont gérés par CSS : alternance left/right
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

// --- Changement de style clair/sombre ---

// --- Toggle dark mode with icon update ---
const toggleBtn = document.getElementById('toggle-style');
const themeIcon = document.getElementById('theme-icon');

function setTheme(dark) {
    if (dark) {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
    }
}

// Save theme in localStorage
function saveThemePref(isDark) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load theme from localStorage
function loadThemePref() {
    return localStorage.getItem('theme') === 'dark';
}

toggleBtn.addEventListener('click', function() {
    const isDark = !document.body.classList.contains('dark-mode');
    setTheme(isDark);
    saveThemePref(isDark);
});

// Initial theme
setTheme(loadThemePref());
