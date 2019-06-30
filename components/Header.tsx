import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
//import Icon from '../static/svg/logo.svg';
import ReactSVG from 'react-svg'
import '../styles/header.scss';


export default class Header extends React.Component {
    render() {
      return (
        <div className="container__header">
          <AppBar>
            <div className="header__tool-bar">
              <div className="tool-bar__options">
                <ReactSVG src='../static/svg/method-draw-image.svg' />
                <Button className="global__button--secondary">How it works?</Button>
              </div>
              <Button className="global__button--primary">Login</Button>
            </div>
          </AppBar>
        </div>
    );
  }
}