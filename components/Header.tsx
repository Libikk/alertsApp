import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
//import Icon from '../static/svg/logo.svg';
import ReactSVG from 'react-svg'
import RegisterForm from './Auth/RegisterForm'
import LoginForm from './Auth/LoginForm'
import '../styles/header.scss';
import axios from 'axios'


export default class Header extends React.Component {
  test = () => {
    axios.get('http://localhost:3000/test').then(e => console.log(e))
  }
    render() {
      return (
        <div className="container__header">
          <AppBar
            position='relative'
          >
            <div className="header__tool-bar">
              <div className="tool-bar__options">
                <ReactSVG src='../static/svg/method-draw-image.svg' />
                <Button className="global__button--secondary">How it works?</Button>
              </div>
              <Button className="global__button--primary">Login</Button>
            </div>
          </AppBar>
          <RegisterForm />
          <LoginForm />
          <Button onClick={this.test}>test</Button>
        </div>
    );
  }
}