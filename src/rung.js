const superagent = require('superagent');
const Promise = require('bluebird');
const promisify = require('superagent-promise');

const agent = promisify(superagent, Promise);

const rungApi = 'https://app.rung.com/api';
const route = path => `${rungApi}${path}`;

function login(email, password) {
    return agent.post(route('/login'))
        .send({ email, password })
        .withCredentials();
}

function whoami() {
    return agent.get(route('/whoami')).withCredentials().end();
}

function getSettings() {
    return agent.get(route('/trello/settings')).withCredentials().end();
}

function getNotifications() {
    return agent.get(route('/notifications')).withCredentials().end();
}

module.exports = { login, whoami, getSettings, getNotifications };
