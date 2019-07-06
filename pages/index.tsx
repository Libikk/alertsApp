import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/styles.scss'
import { getWebsitesWithProducts }from '../dispatchers/websitesDispatchers';

import Layout from '../components/Layout';


class Index extends React.Component {
  test = () => {
    this.props.getWebsitesWithProducts();
   }

  render() {
    const { websites } = this.props;
    return (
      <Layout>
        <div className="title">
          DISCOUT HERO
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <button onClick={() => this.test()}>ttttest</button>
          <button onClick={() => console.log(this.state, this.props)}>state</button>
          {
            websites.websitesList ? websites.websitesList.map(singleWebsite => <div key={singleWebsite.websiteId}>{singleWebsite.createdAt}   ghagaga {singleWebsite.url}</div>) : null
          }
        </div>
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getWebsitesWithProducts: bindActionCreators(getWebsitesWithProducts, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Index);