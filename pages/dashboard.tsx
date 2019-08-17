import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { checkProdExistence, addUserProduct, getUserProducts } from '../dispatchers/productDispatchers';
import TextField from '@material-ui/core/TextField';
import { autorize } from '../dispatchers/authDispatchers';
import { getCookie } from '../utils/auth';
import url from 'url';
import _ from 'lodash';
import '../styles/loginPage.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

type MyProps = {
  checkProdExistence: Function,
  addUserProduct: Function,
  getUserProducts: Function,
  products: {
    productExistence: Object | String,
    userProducts: Array,
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

  componentDidMount = () => {
      this.props.getUserProducts()
  }

  state = {
    urlInput: '',
    isWebsiteAlreadyUsed: null,
    selectedTabIndex: 1,
  }

  handleChange = (event: React.ChangeEvent<{}>, value: number) => this.setState({ selectedTabIndex: value });
  handleChangeIndex = (index: number) =>  this.setState({ selectedTabIndex: index });

  productUrlChange = (e) => {
    this.setState({ urlInput: e.target.value });
    this.props.checkProdExistence(e.target.value)
  }

  addProduct = () => {
    this.props.addUserProduct({
      productUrl: this.state.urlInput,
      productId: this.props.products.productExistence && this.props.products.productExistence.productId
    })
    .then(() => this.props.getUserProducts())
  }

  render () {
    const { selectedTabIndex, urlInput } = this.state;
    return (
          <Layout>
              <div className='dashboard-container'>
                  <div className='header'>
                    <h1>
                        Dashboard
                    </h1>
                  </div>
                  <div className='content'>
                  </div>
                    <div>
                      <Tabs value={selectedTabIndex} onChange={this.handleChange}>
                        <Tab label="My products" />
                        <Tab label="Find product" />
                      </Tabs>
                      <SwipeableViews index={selectedTabIndex} onChangeIndex={this.handleChangeIndex}>
                        <div>
                          My products:  {this.props.products.userProducts.length}
                          {
                            this.props.products.userProducts.map(e => <p>{e.productUrl}</p>)
                          }
                        </div>
                        <div>
                        <h2>
                          {urlInput ? (this.props.products.productExistence ? `This product exist` : 'This product does not exist!') : 'Paste in link to product.'}
                        </h2>
                          <TextField
                            label="Product URL"
                            name="urlInput"
                            type="email"
                            fullWidth
                            placeholder='https://groceries.asda.com/product/milk-drinks/yazoo-chocolate-flavoured-milk/910002182124'
                            value={urlInput}
                            onChange={this.productUrlChange}
                            InputLabelProps={{ shrink: true }}
                          />
                          <Button disabled={!urlInput} onClick={this.addProduct}> Add product </Button>
                      </div>
                    </SwipeableViews>
                  </div>
              </div>
          </Layout>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  checkProdExistence: bindActionCreators(checkProdExistence, dispatch),
  addUserProduct: bindActionCreators(addUserProduct, dispatch),
  getUserProducts: bindActionCreators(getUserProducts, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Dashboard);