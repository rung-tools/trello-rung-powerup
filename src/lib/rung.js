import Promise from 'bluebird';
import superagent from 'superagent';
import promisifyAgent from 'superagent-promise';

const agent = promisifyAgent(superagent, Promise);

export const rung = {
    api: 'https://app.rung.com.br/api',
    route(path) {
        return rung.api + path;
    }
};

export function getExtensions() {
    return agent.get(rung.route('/extensions/home'))
        .then(res => res.body);
}

export function login(email, password) {
    return agent.put(rung.route('/trello/session'))
        .send({ email, password })
        .then(res => res.body);
}

export function oauth(sessionToken) {
    return agent.put(rung.route('/trello/oauth'))
        .send({ sessionToken })
        .then(res => res.body.url);
}
