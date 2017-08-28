import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import path from '../Services/path.js';
import { queryBody } from '../Services/API.js';
import { setToken, setEmail } from '../Services/helper.js';


class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.vis = false;
    }

    submit(e) {
        e.preventDefault();
        let { email, password} = this.refs;
        queryBody("POST", path.login, {
            email: email.value,
            password: password.value
        })
        .then(({ token, email }) => {
            setToken(token);
            setEmail(email);
            this.props.history.push('/');
        })
        .catch(err => {
            document.getElementById('ErrorMessage').classList.add('show');                    
        })
    }
    render() {
        return (
            <div className="auth">
                <p className="auth__title">Welcome to FeedList</p>
                <form className="auth__form" onSubmit={this.submit}>
                    <div className="auth__input-block">
                        <p>Input your email</p>
                        <input className="auth__input" ref="email" type="email" />
                    </div>
                    <div className="auth__input-block">
                        <p>Input your password</p>
                        <input className="auth__input" ref="password" type="password" />
                    </div>
                    <p id="ErrorMessage" className="invisible">Invalid values, retry</p>
                    <button className="auth__submit">LOG IN</button>
                </form>
                <Link to="/setup">If you don't have accaunt</Link>
            </div>
        );
    }
}
export default withRouter(Login);