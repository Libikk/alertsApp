import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store';

class LoginPage extends React.Component {

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