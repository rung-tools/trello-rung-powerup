
/* global TrelloPowerUp, document */

const trello = TrelloTrelloPowerUp.iframe();

document.getElementById('authorize').addEventListener('click', () => {
    console.log('Token is set to asd');
    TrelloPowerUp.set('organization', 'private', 'token', 'asd');
});
