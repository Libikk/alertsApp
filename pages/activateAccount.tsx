import React from 'react'
import Layout from '../components/Layout';
import { autorize } from '../dispatchers/authDispatchers';
import { getCookie } from '../utils/auth';

import { connect } from 'react-redux';

type MyProps = {
  isActivated: boolean,
  isAlreadyActive: number,
  messageData: {
    msg: string,
    isError: boolean
  }
};

class ActivateAccount extends React.Component<MyProps>  {
  static getInitialProps = async ({ req, query, isServer, store }) => {

    if (isServer) {
      const { cookie } = req.headers;
      cookie && await autorize(getCookie('access_token', cookie))(store.dispatch)
      // to do
      // redirect to homepage or login page
    }

    return query.result
  }

  render () {
    return (
          <Layout>
              <div>
                  <h1>{this.props.messageData.msg}</h1>
              </div>
          </Layout>
    )
  }
}
const mapDispatchToProps = dispatch => ({

});

export default connect(state => state, mapDispatchToProps)(ActivateAccount);