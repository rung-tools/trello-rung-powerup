/* global TrelloPowerUp */
TrelloPowerUp.initialize({
    'board-buttons': () => [{
        icon: './resources/rung-white.png',
        text: 'Rung',
        url: 'https://app.rung.com.br/'
    }],
    'show-settings': trello =>
        trello.popup({
            title: 'Rung settings',
            url: 'settings.html'
        }),
    'authorization-status': trello => trello.get('board', 'private', 'sessionToken')
        ,// .then(sessionToken => sessionToken ?  : { authorized: false }),
        /**
         * Dá um /GET em /api/trello/oauth passando o sessionToken como query ?sessionToken=
         */
    'show-authorization': trello =>
        trello.popup({
            title: 'Connect with Rung!',
            url: 'auth.html',
            height: 250
        }),
    'card-buttons': () => [{
        icon: './resources/rung-white.png',
        text: 'Rung',
        callback: () => {}
    }]
});
