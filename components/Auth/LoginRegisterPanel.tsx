import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, register } from '../../dispatchers/authDispatchers';
import _ from 'lodash';
import AccessAlarmIcon from '@material-ui/icons/LockOpen';
import '../../styles/loginPanel.scss';

type MyProps = {
    login: Function,
    register: Function,
    closeModal: Function
}

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

class LoginRegisterPanel extends React.Component<MyProps> {
    state = {
        formType: 'login',
        userName: '',
        email: '',
        password: '',
        userNameError: false,
        emailError: false,
        passwordError: false,
        errorMessages: [],
    }

    handleClickLoginOrRegister = () => {
        const { userName, email, password, formType } = this.state;
        if (formType === 'register' && userName && email && password ) {
            this.validateFields({ userName, email, password });
            this.props.register({userName, email, password})
                .then(() => {
                    Router.push('/loginPage', 'login')
                    this.props.closeModal()
                })
        }

        if (formType === 'login' && email && password ) {
            this.validateFields({ email, password });
            this.props.login({ email, password })
                .then(() => {
                    Router.push('/loginPage', 'login')
                    this.props.closeModal()
                })
        }

        if (formType === 'resetpassword' && email) {
            // todo
        }

    }

    validateFields = ({ userName, email, password } :object) => {
        const errorMessages = [];
        this.setState({ userNameError: false, emailError: false, passwordError: false, errorMessages: []  })
        if (userName && userName.length < 4) {
            this.setState({ userNameError: true });
            errorMessages.push( 'User name is too short (min. 4 characters)');
        }

        if (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(email).toLowerCase())){
                 this.setState({ emailError: true })
                errorMessages.push('Invalid Email');
            }
        }

        if (password) {
            let isErr = false;
            if (password.length < 6) {
                isErr = true
                errorMessages.push('Password too short. (min 6 characters)')
            }

            if (password.length > 16) {
                isErr = true
                errorMessages.push('Password too long. (max 16 characters)')
            }

            this.setState({ passwordError: isErr })
        }

        if (errorMessages.length) {
            this.setState({ errorMessages })
            throw 'Validation failed'
        }
    }

    isFormType = (formOption) => formOption.includes(this.state.formType)
    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    changeFormType = (formType) => {
        if (formType) this.setState({ formType })
    }

    render() {
        const { userName, email, password, formType, userNameError, emailError, passwordError, errorMessages } = this.state;

      return (
        <Card className="login-panel" tabIndex={-1}>
            <AccessAlarmIcon className="login-panel__icon"/>
            <h1>{formTypeOptions[formType].title}</h1>
            <div className="login-panel__sigle-input">
                {formTypeOptions[formType].links.email &&
                    <span className="input-switcher" onClick={() => this.changeFormType(formTypeOptions[formType].links.email)}>
                        {formTypeOptions[formType].links.emailTitle}
                    </span>
                }
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    value={email}
                    error={emailError}
                    onChange={this.handleInputChange}
                    InputLabelProps={{ shrink: true }}
                />
            </div>

                {this.isFormType(['register']) &&
                    <div className="login-panel__sigle-input">
                        <TextField
                            error={userNameError}
                            label="User name"
                            name="userName"
                            fullWidth
                            value={userName}
                            onChange={this.handleInputChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </div>
                }


            {this.isFormType(['register', 'login']) &&
                <div className="login-panel__sigle-input">
                {formTypeOptions[formType].links.password &&
                    <span onClick={() => this.changeFormType(formTypeOptions[formType].links.password)} className="input-switcher">
                        {formTypeOptions[formType].links.passwordTitle}
                    </span>
                }
                <TextField
                    fullWidth
                    error={passwordError}
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={this.handleInputChange}
                    InputLabelProps={{ shrink: true }}
                />
            </div>}
            <div className='login-panel__button-wrapper'>
                {
                    errorMessages.length ? <ul>
                        {errorMessages.map(singleErr => <li>{singleErr}</li>)}
                    </ul> : null
                }
                <Button onClick={this.handleClickLoginOrRegister}>{formTypeOptions[formType].buttonTitle}</Button>
            </div>
        </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    login: bindActionCreators(login, dispatch),
    register: bindActionCreators(register, dispatch),
  });

  export default connect(state => state, mapDispatchToProps)(LoginRegisterPanel)