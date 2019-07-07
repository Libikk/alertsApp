import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/styles.scss'
import { getWebsitesWithProducts } from '../dispatchers/websitesDispatchers';
import { getCurrentDiscounts } from '../dispatchers/scansDispatchers';

import Layout from '../components/Layout';
interface WebsitesList {
  websitesList: Array<{
    url: string,
    createdAt: string,
    websiteId: number
  }> | null;
}

type MyProps = {
  getWebsitesWithProducts: Function,
  websites: WebsitesList,
};

class Index extends React.Component<MyProps> {
  static async getInitialProps ({ query, store, isServer }) {
    if (isServer) {
      await getWebsitesWithProducts()(store.dispatch)
      await getCurrentDiscounts()(store.dispatch)
    }
    return { ...query }
}

  test = (): object => this.props.getWebsitesWithProducts();

  render() {
    const { websites, scans } = this.props;
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
            websites.websitesList && websites.websitesList.map(singleWebsite => <div key={singleWebsite.websiteId}>{singleWebsite.createdAt}   ghagaga {singleWebsite.url}</div>)
          }
          <p>CURRENT DISCOUT HAHAH</p>
          {
            scans.currentDiscounts && scans.currentDiscounts.map(singleProduct => <div key={singleProduct.productId}>{singleProduct.productUrl}  store ->> {singleProduct.websiteUrl}</div>)
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