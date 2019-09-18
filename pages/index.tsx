import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getWebsitesWithProducts } from '../dispatchers/websitesDispatchers';
import { getCurrentDiscounts } from '../dispatchers/scansDispatchers';
import { getUserData } from '../dispatchers/userDispatchers';
import { autorize } from '../dispatchers/authDispatchers';
import Layout from '../components/Layout';
import CurrentDiscounts from '../components/CurrentDiscounts';
import HowItWorks from '../components/HowItWorks';
import { getCookie } from '../utils/auth';
import '../styles/landingPage.scss'



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
  static async getInitialProps ({ req, query, store, isServer }) {
    if (isServer) {
      const { cookie } = req.headers;
      const isAutorized = cookie && await autorize(getCookie('access_token', cookie))(store.dispatch)
      // to do
      // redirect to homepage or login page
    }
    await getWebsitesWithProducts()(store.dispatch)
    await getCurrentDiscounts()(store.dispatch)
    return { ...query }
}

componentWillMount = () => {
 // this.props.getUserData();
}

  test = (): object => this.props.getWebsitesWithProducts();

  render() {
    const { websites, scans } = this.props;
    return (
      <Layout>
        <div className="landing-page">
          <HowItWorks />
          <CurrentDiscounts currentDiscounts={scans.currentDiscounts}/>
          {/* {
            websites.websitesList && websites.websitesList.map(singleWebsite => <div key={singleWebsite.websiteId}>{singleWebsite.createdAt}   ghagaga {singleWebsite.url}</div>)
          } */}
        </div>
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getWebsitesWithProducts: bindActionCreators(getWebsitesWithProducts, dispatch),
  getUserData: bindActionCreators(getUserData, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Index);