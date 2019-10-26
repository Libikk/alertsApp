import React from 'react'
import Layout from '../components/Layout';
import defaultPage from '../components/Auth/defaultPage';
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

export default connect(state => state, mapDispatchToProps)(defaultPage(ActivateAccount));