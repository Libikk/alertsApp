import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ReactSVG from 'react-svg'
import LoginRegisterPanel from './Auth/LoginRegisterPanel'
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../styles/header.scss';

class Header extends React.Component {
  state = {
    isModalOpen: null,
    openMenu: false
  }

  handleClose = () => this.setState({ openMenu: false })

  modalCloseHandler = () => this.setState({ isModalOpen: false })

    render() {
      const { auth } = this.props

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
                  <LoginRegisterPanel />
                </Modal>
              </div>
              { auth && auth.currentUser ? <Avatar onClick={() => this.setState({ openMenu: true })}>{auth.currentUser.userName[0]}</Avatar>
               : <Button onClick={() => this.setState({ isModalOpen: true })}  className="global__button--primary">SIGN IN / SIGN UP</Button>
              }
              <Menu
                id="simple-menu"
                open={this.state.openMenu}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </AppBar>
        </div>
    );
  }
}

export default connect(state => state)(Header)