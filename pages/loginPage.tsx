import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { autorize } from '../dispatchers/authDispatchers';
import { getCookie } from '../utils/auth';
import '../styles/loginPage.scss';

class LoginPage extends React.Component {
  static async getInitialProps ({ req, query, store, isServer }) {
    if (isServer) {
      const { cookie } = req.headers;
      cookie && await autorize(getCookie('access_token', cookie))(store.dispatch);
    }
    return { ...query }
}
  render () {
    console.log(this.props)
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
                        <Link href={{ pathname: 'dashboard' }}>
                        <a>
                          <Button className="global__button--primary" onClick={() => console.log('fjut')}>
                            Dashboard
                          </Button>
                        </a>
                      </Link>
                    </div>
                    <div className='content__single-link'>
                      <Link>
                        <a>
                          <Button className="global__button--primary" onClick={() => console.log('fjut')}>
                            Account settings
                          </Button>
                        </a>
                      </Link>
                    </div>
                    <div className='content__single-link'>
                      <Link>
                        <a>
                          <Button className="global__button--secondary" onClick={() => console.log('fjut')}>
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


export default connect(state => state)(LoginPage);