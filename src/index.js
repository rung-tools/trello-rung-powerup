const TrelloPowerUp = require('power-up');

TrelloPowerUp.initialize({
    'board-buttons': (trello, board) => {
        return [{
            icon: './assets/rung.png',
            text: 'Rung',
            url: 'https://app.rung.com.br/'
        }]
    },

    'show-settings': trello =>
        trello.popup({
            title: 'Rung Settings',
            url: 'settings.html'
        }),

    'authorization-status': () =>
        new TrelloPowerUp.Promise(resolve => {
            resolve({ authorized: false })
        }),

    'show-authorization': trello =>
        trello.popup({
            title: 'Connect with Rung!',
            url: 'authorize.html'
        })
});
