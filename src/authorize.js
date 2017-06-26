
/* global TrelloPowerUp, document */

const trello = TrelloPowerUp.iframe();

document.getElementById('authorize').addEventListener('click', () => {
    console.log('Token is set to asd');
    trello.set('organization', 'private', 'token', 'asd');
});
