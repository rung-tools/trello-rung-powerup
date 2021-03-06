import { getAlerts } from './rung';

/* global TrelloPowerUp, document */
const trello = TrelloPowerUp.iframe();
const sessionToken = trello.arg('sessionToken');
const instance = trello.arg('instance');

const sandbox = ({ content, id }) => `
    <a href="https://app.rung.com.br/i/${id}?ref=trello" target="_blank">
        <div class="card custom-scrollbar">${content}</div>
    </a>`;
let viewDidLoad = false;

const nothing = `
    <div class="nothing">
        There is nothing to see here! &#128542;
    </div>
`;

trello.render(() => {
    const content = document.getElementById('content');
    if (!viewDidLoad) {
        content.innerHTML = 'Loading...';
        viewDidLoad = true;
    }

    getAlerts(instance.id, sessionToken)
        .then(alerts => {
            content.innerHTML = alerts.length > 0
                ? alerts.map(sandbox).join('')
                : nothing;
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
