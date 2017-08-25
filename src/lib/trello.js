import Promise from 'bluebird';
import superagent from 'superagent';
import promisifyAgent from 'superagent-promise';
import { rung, getExtensions } from './rung';

const GRAY_ICON = './resources/rung-gray.png';
const agent = promisifyAgent(superagent, Promise);

const extensionModal = (name, title) => trello =>
    trello.get('board', 'private', 'sessionToken')
        .then(sessionToken =>
            trello.modal({
                url: `https://app.rung.com.br/trello/${name}`,
                accentColor: '#0067B0',
                fullscreen: false,
                height: 540,
                args: { sessionToken },
                title
            }));

const listExtensions = trello => getExtensions()
    .then(extensions => {
        const items = extensions.map(({ name, title }) => ({
            text: title, callback: extensionModal(name, title) }));
        return trello.popup({
            title: 'Extensions',
            items,
            search: {
                count: 20,
                placeholder: 'Search extensions',
                empty: 'No extensions found'
            }
        });
    });

const instances = [
    { name: 'Steam Store', id: '59428fee79fc4f7c85c7e4e2' },
    { name: 'Airbnb', id: '59428f7379fc4f7c85c7e462' }
];
const renderAttachments = (trello, options) => {
    const claimed = options.entries.filter(att => att.url.indexOf('https://app.rung.com.br') === 0);
    return trello.get('board', 'private', 'sessionToken')
        .then(sessionToken => instances.map(instance => ({
            id: `AlertsByRung-${instance.name}-${instance.id}`,
            claimed,
            icon: GRAY_ICON,
            title: instance.name,
            content: {
                type: 'iframe',
                url: trello.signUrl('./attachments.html', { sessionToken, instance })
            }
        })));
};

/* global TrelloPowerUp */
TrelloPowerUp.initialize({
    'attachment-sections': renderAttachments,
    'board-buttons': () => [{
        icon: './resources/rung-white.png',
        text: 'Rung',
        url: 'https://app.rung.com.br/'
    }],
    'card-buttons': () => [{
        icon: GRAY_ICON,
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
