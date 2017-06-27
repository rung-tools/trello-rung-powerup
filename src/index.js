
/* global TrelloPowerUp */

const rung = require('./rung');

TrelloPowerUp.initialize({
    'board-buttons': (trello, board) => [{
        icon: './assets/rung-white.png',
        text: 'Rung',
        url: 'https://app.rung.com.br/'
    }],

    'show-settings': trello =>
        trello.popup({
            title: 'Rung Settings',
            url: 'settings.html'
        }),

    'authorization-status': trello =>
        new Promise(resolve => {
            trello.get('organization', 'private', 'token', '')
                .then(token => {
                    console.log('Token is: ' + token);
                    resolve({ authorized: Boolean(token) });
                });
        }),

    'show-authorization': trello =>
        trello.popup({
            title: 'Connect with Rung!',
            url: 'authorize.html',
            height: 450
        })
});
