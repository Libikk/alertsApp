import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';

class Test extends React.Component {

  render () {
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

export default connect(state => state, mapDispatchToProps)(Test);