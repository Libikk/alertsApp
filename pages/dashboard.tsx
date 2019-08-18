import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkProdExistence, addUserProduct, getUserProducts } from '../dispatchers/productDispatchers';
import { autorize } from '../dispatchers/authDispatchers';
import { getCookie } from '../utils/auth';
import '../styles/dashboard.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Link from 'next/link';

import SwipeableViews from 'react-swipeable-views';


interface ProductExistenceObj {
  productId: number,
  productUrl: string,
  hostName: string,
  productName: string | null,
  createdAt: string,
  isProductActive: number,
  isPromo: number
}

type MyProps = {
  checkProdExistence: Function,
  addUserProduct: Function,
  getUserProducts: Function,
  products: {
    productExistence: ProductExistenceObj | null,
    userProducts: Array<ProductExistenceObj>,
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

  deleteUserProduct = (productId :number) => {

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
                        <div className="my-products">
                          My products:  {this.props.products.userProducts.length}
                          {
                            this.props.products.userProducts.map(e =>
                            <Paper className='my-products__single-product'>
                              <div className='single-product__body'>
                                <Link href={e.productUrl}>{e.productUrl}</Link>
                                <span className={`${e.isProductActive ? '' : 'inactive'}`}>{e.isProductActive ? '' : 'INACTIVE'}</span>
                                <span className={`${e.isPromo ? 'promotion' : ''}`}>{e.isPromo ? 'PROMOTION' : '' }</span>
                                <DeleteOutline onClick={() => this.deleteUserProduct(e.productId)}/>
                              </div>
                            </Paper>)
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