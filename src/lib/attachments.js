import { getAlerts } from './rung';

/* global TrelloPowerUp, document */
const trello = TrelloPowerUp.iframe();
const sessionToken = trello.arg('sessionToken');
const instance = trello.arg('instance');

const sandbox = (html, id) => `
    <a href="https://app.rung.com.br/i/${id}">
        <div class="card custom-scrollbar">${html}</div>
    </a>`;
let viewDidLoad = false;

trello.render(() => {
    const content = document.getElementById('content');
    if (!viewDidLoad) {
        content.innerHTML = 'Loading...';
        viewDidLoad = true;
    }

    getAlerts(instance.id, sessionToken)
        .then(alerts => {
            content.innerHTML = alerts.map(({ content, id }) => sandbox(content)).join('');
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
