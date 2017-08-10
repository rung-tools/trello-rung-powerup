import Promise from 'bluebird';
import superagent from 'superagent';
import promisifyAgent from 'superagent-promise';

const agent = promisifyAgent(superagent, Promise);

const rung = {
    api: 'https://app.rung.com.br/api',
    route(path) {
        return rung.api + path;
    }
};

export function login(email, password) {
    return agent.post(rung.route('/login'))
        .send({ email, password })
        .withCredentials()
        .end();
}

export const trello = {
    getSessionToken: () => agent.get(rung.route('/trello/session'))
        .withCredentials()
        .then(prop('body')),

    restoreSession: (userId, token) => agent.post(rung.route('/trello/session'))
        .send({ id: userId, token })
        .withCredentials()
        .end(),

    deleteSession: () => agent.del(route('/trello/session'))
        .withCredentials()
        .end()
};
