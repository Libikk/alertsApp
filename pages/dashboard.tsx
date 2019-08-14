import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { checkProdExistence, addUserProduct } from '../dispatchers/productDispatchers';
import TextField from '@material-ui/core/TextField';
import { autorize } from '../dispatchers/authDispatchers';
import { getCookie } from '../utils/auth';
import url from 'url';
import _ from 'lodash';
import '../styles/loginPage.scss';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';


type MyProps = {
  checkProdExistence: Function,
  addUserProduct: Function,
  products: {
    productExistence: Object | String
  }
}

class Dashboard extends React.Component<MyProps> {
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

  productUrlChange = (e) => {
    this.setState({ urlInput: e.target.value });
    this.props.checkProdExistence(e.target.value)
  }

  addProduct = () => {
    this.props.addUserProduct({
      productUrl: this.state.urlInput,
      productId: this.props.products.productExistence && this.props.products.productExistence.productId
    })
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
                  <h2>
                    {this.props.products.productExistence ? `This product exist` : 'This product does not exist!'}
                  </h2>
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
                  <Button disabled={!this.state.urlInput} onClick={this.addProduct}> Add product </Button>
              </div>
          </Layout>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  checkProdExistence: bindActionCreators(checkProdExistence, dispatch),
  addUserProduct: bindActionCreators(addUserProduct, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Dashboard);