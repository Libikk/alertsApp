import React from 'react';
import '../../styles/registerForm.scss';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AuthService from '../../api/authService';

export default class RegisterForm extends React.Component {
    state = {
        userName: '',
        email: '',
        password: '',
        repeatPassword: '',
        userNameError: '',
        emailError: '',
        passwordError: '',
        repeatPasswordError: ''
    }

    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleClickRegister = () => {
        const { userName, email, password, repeatPassword } = this.state;
        if (userName && email && password && repeatPassword ) {
            AuthService.register({ userName, email, password })
        }
        console.log('Fill up all fields')
    }

    render() {
        const { userName, email, password, repeatPassword } = this.state;
      return (
        <div className="register-form">
            <FormControl fullWidth margin="normal">
                <InputLabel>User name</InputLabel>
                <Input
                    id="userName"
                    name="userName"
                    value={userName}
                    onChange={this.handleInputChange}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Email</InputLabel>
                <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Password</InputLabel>
                <Input
                    id="password"
                    name="password"
                    value={password}
                    type='password'
                    onChange={this.handleInputChange}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Repeat password</InputLabel>
                <Input
                    type='password'
                    id="repeatPassword"
                    name="repeatPassword"
                    value={repeatPassword}
                    onChange={this.handleInputChange}
                />
            </FormControl>
            <Button onClick={this.handleClickRegister}>Register</Button>
        </div>
    );
  }
}