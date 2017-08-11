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
        .then(res => res.body)
}

export function oauth(token) {
    return agent.put(rung.route('/oauth'))
        .send({ token });
}
