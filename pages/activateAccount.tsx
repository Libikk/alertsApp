import React from 'react'
import Layout from '../components/Layout';
import Input from '@material-ui/core/Input';
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
  static getInitialProps = async ({ query }) => query.result;

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