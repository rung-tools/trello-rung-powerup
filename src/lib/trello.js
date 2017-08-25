import Promise from 'bluebird';
import superagent from 'superagent';
import promisifyAgent from 'superagent-promise';
import { rung, getExtensions } from './rung';

const GRAY_ICON = './resources/rung-gray.png';
const agent = promisifyAgent(superagent, Promise);

const decodeUtf8 = str => decodeURIComponent(escape(str));

const extensionModal = (name, title, card) => trello =>
    trello.get('board', 'private', 'sessionToken')
        .then(sessionToken =>
            trello.modal({
                url: `https://app.rung.com.br/trello/${name}`,
                accentColor: '#0067B0',
                fullscreen: false,
                height: 540,
                args: { sessionToken, card },
                title
            }));

const listExtensions = card => trello => getExtensions()
    .then(extensions => {
        const items = extensions.map(({ name, title }) => ({
            text: title, callback: extensionModal(name, title, card) }));
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
    {
        name: 'Bolsa de valores',
        id: '593bdb87b43ac0601189b497'
    },
    {
        name: 'Cotação de moeda',
        id: '593bf3b95c20d86007aebea0'
    },
    {
        name: 'Descontos na Steam',
        id: '59428fee79fc4f7c85c7e4e2'
    },
    {
        name: 'Filmes Netflix',
        id: '5956c66e8d6bc75c7402a354'
    },
    {
        name: 'Previsão do tempo',
        id: '59428f8abd8b257c7bc006cd'
    },
    {
        name: 'Rastreio de objetos nos Correios',
        id: '59639259f050e47f0d540bef'
    },
    {
        name: 'Reserve acomodações com o Airbnb',
        id: '59428f7379fc4f7c85c7e462'
    }
];

const renderAttachments = (trello, options) => {
    const claimed = options.entries
        .filter(att => att.url.indexOf('https://app.rung.com.br/api/trello/extensions/') === 0);

    const instances = claimed.map(instance => ({
        name: instance.name,
        id: instance.url.match(/[0-9a-f]{24}/i)[0]
    }));

    return trello.get('board', 'private', 'sessionToken')
        .then(sessionToken => instances.map(instance => ({
            id: `AlertsByRung-${instance.name}-${instance.id}`,
            claimed,
            icon: GRAY_ICON,
            title: decodeUtf8(instance.name),
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
    'card-buttons': (trello, options) => [{
        icon: GRAY_ICON,
        text: 'Link to Rung',
        callback: listExtensions(options.context.card)
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
