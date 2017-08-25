import { getAlerts } from './rung';

/* global TrelloPowerUp, document */
const trello = TrelloPowerUp.iframe();
const sessionToken = trello.arg('sessionToken');
const instance = trello.arg('instance');

const sandbox = html => `<div class="card">${html}</div>`;
let viewDidLoad = false;

trello.render(() => {
    const content = document.getElementById('content');
    if (!viewDidLoad) {
        content.innerHTML = 'Loading...';
        viewDidLoad = true;
    }

    getAlerts(instance.id, sessionToken)
        .then(alerts => {
            content.innerHTML = alerts.map(({ content }) => sandbox(content)).join('');
        })
        .catch(err => {
            if (err.status === 401 || err.status === 403) {
                content.innerHTML = 'Authorize your Rung account on Power-Up panel';
            }
        })
        .then(() => {
            console.log('..');
            setTimeout(() => trello.sizeTo('#content'), 5000);
        });
});
