import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
//import Icon from '../static/svg/logo.svg';
import ReactSVG from 'react-svg'
import LoginRegisterPanel from './Auth/LoginRegisterPanel'
import '../styles/header.scss';
import axios from 'axios'


export default class Header extends React.Component {
  state = {
    isModalOpen: null
  }

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
                <Modal
                  className="modal-container"
                  open={this.state.isModalOpen}
                  onClose={() => this.setState({ isModalOpen: false })}
                >
                  <div>
                    <LoginRegisterPanel />
                    {/* <Button onClick={() => this.setState({ isModalOpen: false })}  className="global__button--primary">CLOSE</Button> */}
                  </div>
                </Modal>
              </div>
              <Button onClick={() => this.setState({ isModalOpen: true })}  className="global__button--primary">SIGN IN / SIGN UP</Button>
            </div>
          </AppBar>

          <Button onClick={this.test}>test</Button>
        </div>
    );
  }
}