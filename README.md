# memory
Le jeu memory qui a bercé votre enfance

<p>Au commencement du jeu, des cartes sont disposées face cachée à l'écran.
    <ul>
        <li>Le joueur doit cliquer sur deux cartes. Si celles-ci sont identiques, la paire est validée. Sinon, les cartes sont retournées face cachée, et le joueur doit sélectionner une nouvelle paire de cartes.</li>
        <li>Une compteur de temps, avec une barre de progression, s’affiche en dessous du plateau.</li>
        <li>Le joueur gagne s'il arrive à découvrir toutes les paires avant la fin du temps imparti.</li>
    </ul>
    </p>
    <h2>Les images</h2>
    <img src="images/cards.png">

## Installation
### Le backend
La partie backend nécessite une base de données MySQL et un serveur PHP.

Une fois créée une base de données `memory` il est possible de créer l'unique table utilisée par le système et d'y injecter un promier jeu de données d'exemple avec le script `memory.sql` présent dans le dossier `backend/System`.

Il est également possible de démarrer le serveur PHP dans le terminal au moyen de la commande suivante à passer depuis le répertoire racine du projet :

`php -S 127.0.0.1:8000 -t backend`

Pour le front end, il suffit d'ouvrir le fichier `index.html` dans un navigateur Web, l'utilisation d'un serveur n'est pas obligatoire.

