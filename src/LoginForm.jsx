import { h, render, Component } from 'preact';
import { login } from './lib/rung';

const styles = {
    container: {
        padding: '10px',
        overflow: 'hidden',
        width: '100%'
    },
    input: {
        width: '100%'
    },
    button: {
        width: '100%'
    }
};

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChangeEmail(email) {
        this.setState({ email });
    }

    handleChangePassword(password) {
        this.setState({ password });
    }

    handleSubmit() {
        const { email, password } = this.state;
        this.setState({ loading: true });
        login(email, password)
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div style={ Object.assign({}, styles.container, { maxWidth: `${window.innerWidth - 20}px` }) }>
                <p>At first, you need to link your Rung account to Trello</p>
                <input
                    type="text"
                    style={ styles.input }
                    placeholder="Rung email"
                    onChange={ ({ target }) => this.handleChangeEmail(target.value) }
                />
                <input
                    type="password"
                    style={ styles.input }
                    placeholder="Rung password"
                    onChange={ ({ target }) => this.handleChangePassword(target.value) }
                />
                <button
                    style={ styles.button }
                    disabled={ this.state.loading }
                    className="mod-primary mod-bottom"
                    onClick={ this.handleSubmit.bind(this) }>
                    { this.state.loading ? 'Loading...' : 'Link your Rung account' }
                </button>
            </div>
        );
    }
}
