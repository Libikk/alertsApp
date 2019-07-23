import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../dispatchers/authDispatchers';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ReactSVG from 'react-svg'
import LoginRegisterPanel from './Auth/LoginRegisterPanel'
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../styles/header.scss';

interface AuthObj {
  currentUser: {
    userName: string,
    userId: number,
    email: string
  }
}

type MyProps = {
  logout: Function,
  auth: AuthObj | null,
};

class Header extends React.Component<MyProps> {
  state = {
    isModalOpen: false,
    openMenu: false,
    anchorEl: null
  }

  handleClose = (event) => {
    console.log('e: ', event.currentTarget);
    this.setState({ openMenu: false, anchorEl: event.currentTarget })
}

  modalCloseHandler = () => this.setState({ isModalOpen: false })
  

    render() {
      const { anchorEl } = this.state;
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
              <div>
                { auth && auth.currentUser ?
                <div className='tool-bar__user-buttons-wrapper'>
                  <Button className="global__button--secondary">Dashboard</Button>
                  <Avatar
                    onClick={() => this.setState({ openMenu: true })}
                    aria-controls='userMenu'
                    aria-haspopup="true"
                  >
                    {auth.currentUser.userName[0]}
                  </Avatar>
                  <Menu
                    keepMounted
                    id='userMenu'
                    anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                    anchorEl={anchorEl}
                    open={this.state.openMenu}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={() => this.props.logout()}>Logout</MenuItem>
                  </Menu>
                </div>
                : <Button onClick={() => this.setState({ isModalOpen: true })}  className="global__button--primary">SIGN IN / SIGN UP</Button>
                }
              </div>

            </div>
          </AppBar>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Header)