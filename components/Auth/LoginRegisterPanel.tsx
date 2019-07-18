import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AuthService from '../../api/authService';
import _ from 'lodash';
import '../../styles/loginPanel.scss';

const formTypeOptions = {
    login: {
        formType:'login',
        title: 'Sign in to DiscoutHero.com',
        links: {
            email: 'register',
            emailTitle: `Don't have an account? Sign up here.`,
            password: 'resetPassword',
            passwordTitle: 'Forgot password?'
        },
        buttonTitle: 'SIGN IN'
    },
    register: {
        formType:'register',
        title: 'Register for a free account',
        links: {
            emailTitle: 'Already have an account? Sign in here.',
            email: 'login',
        },
        buttonTitle: 'REGISTER'
    },
    resetPassword: {
        formType:'resetPassword',
        title: 'Reset Password',
        links: {
            emailTitle: 'Sign in',
            email: 'login',
        },
        buttonTitle: 'RESET'
    }
}

export default class LoginPanel extends React.Component {
    state = {
        formType: 'login',
        userName: '',
        email: '',
        password: '',
        userNameError: '',
        emailError: '',
        passwordError: '',
    }

    handleClickLoginOrRegister = () => {
        const { userName, email, password, formType } = this.state;
        if (formType === 'register' && userName && email && password ) {
            AuthService.register({ userName, email, password })
        }
        if (formType === 'login' && email && password ) {
            AuthService.login({ email, password })
        }
        if (formType === 'resetpassword' && email) {
            // todo
        }
    }
    isFormType = (formOption) => formOption.includes(this.state.formType)
    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    changeFormType = (formType) => {
        if (formType) this.setState({ formType })
    }

    render() {
        const { userName, email, password, formType } = this.state;

      return (
        <Card className="login-panel">
            <h1>{formTypeOptions[formType].title}</h1>
            {formTypeOptions[formType].links.email &&
                <div onClick={() => this.changeFormType(formTypeOptions[formType].links.email)}>
                    {formTypeOptions[formType].links.emailTitle}
                </div>
            }
            <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={email}
                onChange={this.handleInputChange}
                InputLabelProps={{ shrink: true }}
            />
            {this.isFormType(['register']) && <TextField
                label="User name"
                name="userName"
                fullWidth
                value={userName}
                onChange={this.handleInputChange}
                InputLabelProps={{ shrink: true }}
            />}
            {formTypeOptions[formType].links.password &&
                <div onClick={() => this.changeFormType(formTypeOptions[formType].links.password)}>
                    {formTypeOptions[formType].links.passwordTitle}
                </div>
            }
            {this.isFormType(['register', 'login']) && <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={this.handleInputChange}
                InputLabelProps={{ shrink: true }}
            />}
            <Button onClick={this.handleClickLoginOrRegister}>{formTypeOptions[formType].buttonTitle}</Button>
        </Card>
    );
  }
}