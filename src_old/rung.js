const superagent = require('superagent');
const Promise = require('bluebird');
const promisify = require('superagent-promise');
const { prop } = require('ramda');

const agent = promisify(superagent, Promise);

const rungApi = 'https://app.rung.com.br/api';
const route = path => `${rungApi}${path}`;

function login(email, password) {
    return agent.post(route('/login'))
        .send({ email, password })
        .withCredentials()
        .end();
}

function getSessionToken() {
    return agent.get(route('/trello/session'))
        .withCredentials()
        .end()
        .then(prop('body'));
}

function restoreSession(userId, token) {
    return agent.post(route('/trello/session'))
        .send({ id: userId, token })
        .withCredentials()
        .end();
}

function deleteSession() {
    return agent.del(route('/trello/session')).withCredentials().end();
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

module.exports = {
    deleteSession,
    getNotifications,
    getSessionToken,
    getSettings,
    login,
    restoreSession,
    whoami
};
