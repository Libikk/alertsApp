import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../dispatchers/authDispatchers';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import LogoIcon from '../static/svg/logo-edited.svg';
import LoginRegisterPanel from './Auth/LoginRegisterPanel'
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link';
import { version } from '../appConfig';
import '../styles/header.scss';
import Router from 'next/router';
import { event } from 'react-ga';
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

  handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.handleOpen();
    this.setState({ anchorEl: e.currentTarget })
  }

  handleOpen = () => {
    this.setState({ openMenu: true })
  }

  handleClose = () => {
    this.setState({ openMenu: false })
  }

  navigateToAccSettings = () => {
    this.handleClose();
    Router.push({ pathname: '/accountsettings' }, '/accountSettings');
  }

  onSignInUpClick = () => {
    this.setState({ isModalOpen: true })
    event({ category: 'landing-page', action: 'click', label: 'SIGN IN / SIGN UP' })
  }

  modalCloseHandler = () => this.setState({ isModalOpen: false })


    render() {
      const { anchorEl } = this.state;
      const { auth } = this.props

      return (
        <div className="container__header" app-version={version}>
          <AppBar
            position='relative'
          >
            <div className="header__tool-bar">
              <div className="tool-bar__options">
              <Link href={{ pathname: '/' }} >
                  <a>
                      <LogoIcon />
                  </a>
                  </Link>
                <Button className="global__button--secondary">How it works?</Button>
                <Modal
                  className="modal-container"
                  open={this.state.isModalOpen}
                  onClose={() => this.setState({ isModalOpen: false })}
                >
                  <LoginRegisterPanel closeModal={this.modalCloseHandler}/>
                </Modal>
              </div>
              <div>
                { auth && auth.currentUser ?
                <div className='tool-bar__user-buttons-wrapper'>
                  <Link href={{ pathname: '/dashboard' }} as='/dashboard/myProducts'>
                    <a>
                      <Button className="global__button--secondary">
                        Dashboard
                      </Button>
                    </a>
                  </Link>
                  <Avatar
                    onClick={this.handleMenuClick}
                    className="user-buttons-wrapper__avatar"
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
                    <MenuItem onClick={this.navigateToAccSettings}>Account Settings</MenuItem>
                    <MenuItem onClick={() => this.props.logout()}>Logout</MenuItem>
                  </Menu>
                </div>
                : <Button onClick={this.onSignInUpClick}  className="global__button--primary">SIGN IN / SIGN UP</Button>
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