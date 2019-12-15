import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import defaultPage from '../components/Auth/defaultPage';
import '../styles/loginPage.scss';

class LoginPage extends React.Component {
  render () {
    const { currentUser } = this.props.auth;
    return (
          <Layout>
              <div className='loginPage-container'>
                  <div className='header'>
                    <h1>
                        Welcome back, {currentUser && currentUser.userName}
                    </h1>
                  </div>
                  <div className='content'>
                    <div className='content__single-link'>
                      <Link href={{ pathname: 'dashboard' }} as='dashboard/myProducts'>
                        <a>
                          <Button className="global__button--primary">
                            Dashboard
                          </Button>
                        </a>
                      </Link>
                    </div>
                    <div className='content__single-link'>
                      <Link href={{ pathname: 'accountSettings' }} as='accountsettings'>
                        <a>
                          <Button className="global__button--primary">
                            Account settings
                          </Button>
                        </a>
                      </Link>
                    </div>
                    <div className='content__single-link'>
                      <Link>
                        <a>
                          <Button className="global__button--secondary">
                            Log out
                          </Button>
                        </a>
                      </Link>
                    </div>
                  </div>
              </div>
          </Layout>
    )
  }
}

export default connect(state => state)(defaultPage(LoginPage));