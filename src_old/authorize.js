
/* global TrelloPowerUp, document */

const { all } = require('bluebird');
const { login, getSessionToken } = require('./rung');

const trello = TrelloPowerUp.iframe();

function beginSession() {
    return getSessionToken()
        .then(({ userId, token }) => all([
            trello.set('organization', 'private', 'userId', userId),
            trello.set('organization', 'private', 'token', token)]));
}

document.getElementById('authorize').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password)
        .tap(beginSession)
        .then(() => trello.closePopup())
        .catch(err => {
            console.log('Authentication error! ' + err.message);
            // TODO: show an authentication error
        });
});
