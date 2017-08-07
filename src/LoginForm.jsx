import { h, render, Component } from 'preact';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChangeEmail(email) {
        this.setState({ email });
    }

    handleChangePassword(password) {
        this.setState({ password });
    }

    handleSubmit() {
        console.log(this.state);
    }

    render() {
        return (
            <div style="overflow: hidden">
                <p>At first, you need to link your Rung account to Trello</p>
                <input
                    type="text"
                    placeholder="Rung email"
                    onChange={ ({ target }) => this.handleChangeEmail(target.value) }
                />
                <input
                    type="password"
                    placeholder="Rung password"
                    onChange={ ({ target }) => this.handleChangePassword(target.value) }
                />
                <button className="mod-primary mod-bottom" onClick={ this.handleSubmit.bind(this) }>
                    Link your Rung account
                </button>
            </div>
        );
    }
}
