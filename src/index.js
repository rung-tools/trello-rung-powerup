
/* global TrelloPowerUp */

const { whoami } = require('./rung');

TrelloPowerUp.initialize({
    'board-buttons': () => [{
        icon: './assets/rung-white.png',
        text: 'Rung',
        url: 'https://app.rung.com.br/'
    }],

    'show-settings': trello =>
        trello.popup({
            title: 'Rung Settings',
            url: 'settings.html'
        }),

    'authorization-status': () =>
        whoami()
            .thenReturn({ authorized: true })
            .catchReturn({ authorized: false }),

    'show-authorization': trello =>
        trello.popup({
            title: 'Connect with Rung!',
            url: 'authorize.html',
            height: 200
        })
});
