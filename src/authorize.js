
/* global TrelloPowerUp, document */

const trello = TrelloPowerUp.iframe();

document.getElementById('authorize').addEventListener('click', () => {
    // TODO: get token from our endpoint
    const token = document.getElementById('email').value;

    trello.set('organization', 'private', 'token', token)
        .then(() => {
            console.log('Token is set to ' + token);
            trello.closePopup();
        });
});
