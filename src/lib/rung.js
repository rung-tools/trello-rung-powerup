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

export function getAlerts(extensionId, sessionToken) {
    return agent.get(rung.route(`/trello/extensions/${extensionId}/alerts`))
        .query({ sessionToken })
        .then(res => res.body);
}

export function getCategories() {
    return agent.get(rung.route('/categories'))
        .then(res => res.body);
}

export function getExtensions(category) {
    return agent.get(rung.route(`/extensions/category/${category}`))
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
