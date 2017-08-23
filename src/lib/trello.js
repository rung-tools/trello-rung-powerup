import Promise from 'bluebird';
import superagent from 'superagent';
import promisifyAgent from 'superagent-promise';
import { rung } from './rung';

const agent = promisifyAgent(superagent, Promise);

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
        .then(sessionToken => sessionToken
            ? agent.get(rung.route('/oauth'))
                .query({ sessionToken })
                .then(res => res.body)
                .catchReturn({ authorized: true })
            : { authorized: false }),
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
