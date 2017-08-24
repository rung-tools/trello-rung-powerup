import { getAlerts } from './rung';

/* global TrelloPowerUp, document */
const trello = TrelloPowerUp.iframe();
const sessionToken = trello.arg('sessionToken');

trello.render(() => {
    const tempId = '59428fee79fc4f7c85c7e4e2';
    const content = document.getElementById('content');
    getAlerts(tempId, sessionToken)
        .then(alerts => {
            const sandbox = html => `<div class="card">${html}</div>`;
            content.innerHTML = alerts.map(alert => sandbox(alert.content)).join('');
        })
        .catch(err => {
            if (err.status === 401 || err.status === 403) {
                const message = 'Authorize your Rung account on Power-Up panel';
                content.innerHTML = message;
            }
        })
        .then(() => {
            trello.sizeTo('#content');
        });
});
