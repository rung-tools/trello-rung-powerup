const TrelloPowerUp = require('power-up');

/* global TrelloPowerUp */

const { all, reject } = require('bluebird');
const { isNil, when } = require('ramda');
const { whoami, restoreSession } = require('./rung');

const getSessionCredentials = trello => all([
    trello.get('organization', 'private', 'userId', ''),
    trello.get('organization', 'private', 'token', '')]);

const ensureCredentials = trello =>
    trello.get('organization', 'private', 'userId', '')
        .then(when(isNil, reject));

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

    'authorization-status': trello =>
        ensureCredentials(trello)
            .then(() => whoami().catch(() =>
                getSessionCredentials(trello).spread(restoreSession)))
            .thenReturn({ authorized: true })
            .catchReturn({ authorized: false }),

    'show-authorization': trello =>
        trello.popup({
            title: 'Connect with Rung!',
            url: 'authorize.html',
            height: 200
        })
});
