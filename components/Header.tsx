import React, { useState, } from 'react';
import { useSelector } from 'react-redux';
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
import { useDispatch } from 'react-redux';
import useWindowWidth from '../hooks/windowWidthHook';

const Header = () => {
  const { isMobileView } = useWindowWidth();

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  }

  const navigateToAccSettings = () => {
    setOpenMenu(false);
    Router.push({ pathname: '/accountsettings' }, '/accountSettings');
  }

  const navigateToDashboard = () => {
    setOpenMenu(false);
    Router.push({ pathname: '/dashboard' }, '/dashboard');
  }

  const onSignInUpClick = () => {
    setIsModalOpen(true);
    event({ category: 'landing-page', action: 'click', label: 'SIGN IN / SIGN UP' })
  }

  const onMenuClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  }
      return (
        <div className="container__header" app-version={version}>
          <AppBar
            position='relative'
          >
            <div className="header__tool-bar">
              <div className="tool-bar__options">
              {!isMobileView && <Link href={{ pathname: '/' }} >
                  <a>
                      <LogoIcon />
                  </a>
                  </Link>}
                  { auth && auth.currentUser && <Button className="global__button--secondary" onClick={() => Router.push({ pathname: '/dashboard' }, '/dashboard')}>Add product</Button>}
                <Modal
                  className="modal-container"
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <LoginRegisterPanel closeModal={() => setIsModalOpen(false)}/>
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
                    onClick={handleMenuClick}
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
                    open={openMenu}
                    onClose={onMenuClose}
                  >
                    <MenuItem onClick={navigateToAccSettings}>Account Settings</MenuItem>
                    <MenuItem onClick={navigateToDashboard}>Dashboard</MenuItem>
                    <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
                  </Menu>
                </div>
                : <Button onClick={onSignInUpClick}  className="global__button--primary">SIGN IN / SIGN UP</Button>
                }
              </div>

            </div>
          </AppBar>
        </div>
    );
}

export default Header