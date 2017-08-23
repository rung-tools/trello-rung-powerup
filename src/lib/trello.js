import Promise from 'bluebird';
import superagent from 'superagent';
import promisifyAgent from 'superagent-promise';
import { rung, getExtensions } from './rung';

const agent = promisifyAgent(superagent, Promise);

const extensionModal = (name, title) => trello => trello.modal({
    url: `http://35.165.157.18/trello/${name}`,
    accentColor: '#0067B0',
    fullscreen: false,
    height: 500,
    title
});

const listExtensions = trello => getExtensions()
    .then(extensions => {
        const items = extensions.map(({ name, title }) => ({
            text: title, callback: extensionModal(name, title) }));
        return trello.popup({
            title: 'Extensions',
            items,
            search: {
                count: 10,
                placeholder: 'Search extensions',
                empty: 'No extensions found'
            }
        });
    });

/* global TrelloPowerUp */
TrelloPowerUp.initialize({
    'board-buttons': () => [{
        icon: './resources/rung-white.png',
        text: 'Rung',
        url: 'https://app.rung.com.br/'
    }],
    'card-buttons': () => [{
        icon: './resources/rung-gray.png',
        text: 'Link to Rung',
        callback: listExtensions
    }],
    'authorization-status': trello => trello.get('board', 'private', 'sessionToken')
        .then(sessionToken => sessionToken
            ? agent.get(rung.route('/trello/oauth'))
                .query({ sessionToken })
                .then(res => res.body)
                .catchReturn({ authorized: false })
            : { authorized: false }),
    'show-authorization': trello =>
        trello.popup({
            title: 'Connect with Rung!',
            url: 'auth.html',
            height: 250
        })
});
