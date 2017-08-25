import { getAlerts } from './rung';

/* global TrelloPowerUp, document */
const trello = TrelloPowerUp.iframe();
const sessionToken = trello.arg('sessionToken');
const instances = trello.arg('instances');

const sandbox = html => `<div class="card">${html}</div>`;
const loaded = [];

trello.render(() => {
    const content = document.getElementById('content');
    instances.forEach(({ name, id }) => {
        if (!loaded[id]) {
            content.innerHTML = 'Loading...';
            loaded[id] = true;
        }

        getAlerts(id, sessionToken)
            .then(alerts => {
                content.innerHTML = alerts.map(({ content }) => sandbox(content)).join('');
            })
            .catch(err => {
                if (err.status === 401 || err.status === 403) {
                    content.innerHTML = 'Authorize your Rung account on Power-Up panel';
                }
            })
            .then(() => {
                trello.sizeTo('#content');
            });
    });
});
