TrelloPowerUp.initialize({
    'board-buttons': () => [{
        icon: './assets/images/rung-white.png',
        text: 'Rung',
        url: 'https://app.rung.com.br/'
    }],

    'show-settings': trello =>
        trello.popup({
            title: 'Rung settings',
            url: 'settings.html'
        }),
    'authorization-status': () => ({ authorized: false }),
    'show-authorization': trello =>
        trello.popup({
            title: 'Connect with Rung!',
            url: 'authorize.html',
            height: 250
        })
});
