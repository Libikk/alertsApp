import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { getWebsitesWithProducts } from '../dispatchers/websitesDispatchers';
import { getCurrentDiscounts } from '../dispatchers/productDispatchers';
import TextField from '@material-ui/core/TextField';
import { autorize } from '../dispatchers/authDispatchers';
import { getCookie } from '../utils/auth';
import url from 'url';
import '../styles/loginPage.scss';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

class Dashboard extends React.Component {
  static async getInitialProps ({ req, query, store, isServer }) {
    if (isServer) {
      const { cookie } = req.headers;
      cookie && await autorize(getCookie('access_token', cookie))(store.dispatch);
    }
    return { ...query }
  }

  state = {
    urlInput: '',
    isWebsiteAlreadyUsed: null
  }

  componentDidMount = () => {
    if (!this.props.websites.websitesList) {
      this.props.getWebsitesWithProducts();
    }
  }

  addProductHandler = () => {
    this.props.getCurrentDiscounts(this.state.urlInput)
    // check if website exist if not create
  }
  checkIfWebsiteExists = (inputURL) => {
    const parsedUrl = url.parse(inputURL);
    const isExistHostName = this.props.websites.websitesList.find(e => e.url === parsedUrl.hostname)
    this.setState({ isWebsiteAlreadyUsed: parsedUrl.hostname && isExistHostName })
  }

  productUrlChange = (e) => {
    this.checkIfWebsiteExists(e.target.value)
    this.setState({ urlInput: e.target.value });
  }

  render () {
    return (
          <Layout>
              <div className='dashboard-container'>
                  <div className='header'>
                    <h1>
                        Dashboard
                    </h1>
                  </div>
                  <div className='content'>
                  {/* <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    >
                    <Tab label="My products" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                  </Tabs> */}
                  </div>
                  <TextField
                    label="Product URL"
                    name="urlInput"
                    type="email"
                    fullWidth
                    placeholder='https://groceries.asda.com/product/milk-drinks/yazoo-chocolate-flavoured-milk/910002182124'
                    value={this.state.urlInput}
                    onChange={this.productUrlChange}
                    InputLabelProps={{ shrink: true }}
                  />
                  <Button onClick={this.addProductHandler}>test</Button>
              </div>
          </Layout>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  getWebsitesWithProducts: bindActionCreators(getWebsitesWithProducts, dispatch),
  getCurrentDiscounts: bindActionCreators(getCurrentDiscounts, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Dashboard);