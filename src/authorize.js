
/* global TrelloPowerUp, document */

const { login } = require('./rung');

const trello = TrelloPowerUp.iframe();

document.getElementById('authorize').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password).then(() => trello.closePopup());
    // TODO: show an authentication error
});
