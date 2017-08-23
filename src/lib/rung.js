import Promise from 'bluebird';
import superagent from 'superagent';
import promisifyAgent from 'superagent-promise';

const agent = promisifyAgent(superagent, Promise);

export const rung = {
    api: 'https://app.rung.com.br/api/trello',
    route(path) {
        return rung.api + path;
    }
};

export function login(email, password) {
    return agent.put(rung.route('/session'))
        .send({ email, password })
        .then(res => res.body);
}

export function oauth(sessionToken) {
    return agent.put(rung.route('/oauth'))
        .send({ sessionToken })
        .then(res => res.body.url);
}
