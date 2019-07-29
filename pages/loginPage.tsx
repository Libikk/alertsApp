import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { autorize } from '../dispatchers/authDispatchers';
import { getCookie } from '../utils/auth';

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
              <div>
                  <button onClick={() => console.log(this.props)}>ss</button>
                   Welcome back, {currentUser && currentUser.userName}
              </div>
          </Layout>
    )
  }
}


export default connect(state => state)(LoginPage);