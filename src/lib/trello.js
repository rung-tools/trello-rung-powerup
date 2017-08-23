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
    'card-buttons': function (t, opts) {
        return [{
          // usually you will provide a callback function to be run on button click
          // we recommend that you use a popup on click generally
          icon: GRAY_ICON, // don't use a colored icon here
          text: 'Open Popup',
          callback: () => {}
        }, {
          // but of course, you could also just kick off to a url if that's your thing
          icon: GRAY_ICON,
          text: 'Just a URL',
          url: 'https://developers.trello.com',
          target: 'Trello Developer Site' // optional target for above url
        }];
    },
    'authorization-status': trello => trello.get('board', 'private', 'sessionToken')
        .then(sessionToken => sessionToken
            ? agent.get(rung.route('/oauth'))
                .query({ sessionToken })
                .then(res => res.body)
                .catchReturn({ authorized: false })
            : { authorized: false }),
    'show-authorization': trello =>
        trello.popup({
            title: 'Connect with Rung!',
            url: 'auth.html',
            height: 250
        }),
});
