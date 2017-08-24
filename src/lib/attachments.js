import { getAlerts } from './rung';

/* global TrelloPowerUp */
const trello = TrelloPowerUp.iframe();
const sessionToken = trello.arg('sessionToken');

trello.render(() => {
    const tempId = '593bdb87b43ac0601189b497';
    getAlerts(tempId, sessionToken)
        .then(alerts => {
            document.getElementById('content').innerHTML = alerts.map(alert => alert.content).join('<br />');
        })
        .then(() => {
            trello.sizeTo('#content');
        })
});
