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

/* global TrelloPowerUp */
TrelloPowerUp.initialize({
    'attachment-sections': function(t, options){
        // options.entries is a list of the attachments for this card
        // you can look through them and 'claim' any that you want to
        // include in your section.

        // we will just claim urls for Yellowstone
        var claimed = options.entries.filter(function (attachment) {
          return attachment.url.indexOf('http://www.nps.gov/yell/') === 0;
        });

        // you can have more than one attachment section on a card
        // you can group items together into one section, have a section
        // per attachment, or anything in between.
        if (claimed && claimed.length > 0) {
          // if the title for your section requires a network call or other
          // potentially lengthy operation you can provide a function for the title
          // that returns the section title. If you do so, provide a unique id for
          // your section
          return [{
            id: 'Yellowstone', // optional if you aren't using a function for the title
            claimed: claimed,
            icon: GRAY_ICON,
            title: 'Example Attachment Section: Yellowstone',
            content: {
              type: 'iframe',
              url: t.signUrl('./attachments.html', {
                arg: 'you can pass your section args here'
              }),
              height: 230
            }
          }];
        } else {
          return [];
        }
      },
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
