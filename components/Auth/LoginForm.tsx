import React from 'react';
import '../../styles/registerForm.scss';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AuthService from '../../api/authService';

export default class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
    }

    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleClickRegister = () => {
        const { email, password } = this.state;
        if (email && password) {
            AuthService.login({ email, password })
        }
        console.log('Fill up all fields')
    }

    render() {
        const { email, password } = this.state;
      return (
        <div className="register-form">
            <FormControl fullWidth margin="normal">
                <InputLabel>Email</InputLabel>
                <Input
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Password</InputLabel>
                <Input
                    name="password"
                    value={password}
                    onChange={this.handleInputChange}
                />
            </FormControl>
            <Button onClick={this.handleClickRegister}>Login</Button>
        </div>
    );
  }
}