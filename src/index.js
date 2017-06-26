
/* global TrelloPowerUp */

const rung = require('./rung');

TrelloPowerUp.initialize({
    'board-buttons': (trello, board) => [{
        icon: './assets/rung.png',
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
            const token = trello.get('organization', 'private', 'token', '');
            console.log('Token is: ' + token);
            resolve({ authorized: Boolean(token) });
        }),

    'show-authorization': trello =>
        trello.popup({
            title: 'Connect with Rung!',
            url: 'authorize.html'
        })
});
