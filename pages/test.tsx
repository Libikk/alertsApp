import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import defaultPage from '../components/Auth/defaultPage'

class Test extends React.Component {
  render () {
    console.log(this.props, this)
    return (
          <Layout>
              <div>
                  gunwo
              </div>
          </Layout>
    )
  }
}
const mapDispatchToProps = dispatch => ({

});

export default connect(state => state, mapDispatchToProps)(defaultPage(Test));