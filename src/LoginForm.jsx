import { h, render, Component } from 'preact';
import rung from '../assets/images/rung-full-white.png';
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
        width: '100%',
        maxWidth: '500px'
    },
    logo: {
        width: '100%',
        maxWidth: '500px'
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

    handleEnterEmail(event) {
        const key = event.keyCode || event.which;
        if (key === 13 && this.state.email.trim() !== '' && this._password) {
            this._password.focus();
        }
    }

    handleEnterPassword(event) {
        const key = event.keyCode || event.which;
        if (key === 13 && this.state.email.trim() !== '' && this.state.password.trim() !== '') {
            this.handleSubmit();
        }
    }

    handleSubmit() {
        const { email, password } = this.state;
        this.setState({ loading: true });
        login(email, password)
            .finally(() => {
                this.setState({ loading: false, password: '' });
            });
    }

    render() {
        return (
            <div style={ Object.assign({}, styles.container, { maxWidth: `${window.innerWidth - 20}px` }) }>
                <img src={ rung } style={ styles.logo } draggable={ false } />
                <input
                    type="text"
                    style={ styles.input }
                    placeholder="Rung email"
                    value={ this.state.email }
                    onChange={ ({ target }) => this.handleChangeEmail(target.value) }
                    onKeyUp={ this.handleEnterEmail.bind(this) }
                />
                <input
                    type="password"
                    style={ styles.input }
                    placeholder="Rung password"
                    value={ this.state.password }
                    ref={ password => {
                        this._password = password;
                    } }
                    onChange={ ({ target }) => this.handleChangePassword(target.value) }
                    onKeyUp={ this.handleEnterPassword.bind(this) }
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
