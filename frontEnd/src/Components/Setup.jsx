import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import path from '../Services/path.js';
import { queryBody } from '../Services/API.js';
import { setToken, setEmail } from '../Services/helper.js';

class Setup extends PureComponent {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.vis = false;
    }

    submit(e) {
        e.preventDefault();
        let {email, password, confirm} = this.refs;
        if(password.value !== confirm.value || password.value < 8) {
            this.refs.password.value = this.refs.confirm.value = '';
            document.getElementById('ErrorMessage').classList.add('show');
        } else {
            queryBody("POST", path.setup, {
                email: email.value,
                password: password.value,
                confirm: confirm.value
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
    }
    checkPassword() {
        let value = this.refs.password.value;
        document.getElementById('password').style.borderColor =
            (value.length < 8) ? 'red' : (
                (value.length < 11) ? 'orange' :
                'green'
            )
        
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
                        <input onChange={this.checkPassword} target="none" id="password" className="auth__input" ref="password" type="password" />
                    </div>
                    <div className="auth__input-block">
                        <p>Please, confirm your password</p>
                        <input className="auth__input" ref="confirm"type="password" />
                    </div>
                    <p id="ErrorMessage" className="invisible">Invalid values, retry</p>
                    <button className="auth__submit">SING UP</button>    
                </form>
                <Link to="/login">If you alreary have accaunt</Link>
            </div>
        );
    }
}
export default withRouter(Setup);