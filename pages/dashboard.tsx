import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import defaultPage from '../components/Auth/defaultPage';
import { bindActionCreators } from 'redux';
import { addUserProduct, getUserProducts, deleteUserProduct } from '../dispatchers/productDispatchers';
import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import ProductsList from '../components/Shared/ProductsList';
import WebsiteAndProductsManagement from '../components/Shared/WebsiteAndProductsManagement';
import SwipeableViews from 'react-swipeable-views';
import url from 'url';
import { event } from 'react-ga';
import '../styles/dashboard.scss';
import get from 'lodash/get';
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
  addUserProduct: Function,
  getUserProducts: Function,
  products: {
    productExistence: ProductExistenceObj | null,
    userProducts: Array<ProductExistenceObj>,
  },
  auth: {
    currentUser: {
      role: string
    }
  }
}

class Dashboard extends React.Component<MyProps> {
  componentDidMount = () => {
      this.props.getUserProducts()
    }

  state = {
    urlInput: '',
    isWebsiteAlreadyUsed: null,
    selectedTabIndex: 1,
    isProductInputError: false
  }

  handleKeyPress = (event) => event.key === 'Enter' && this.addProduct();
  
  handleChange = (e: React.ChangeEvent<{}>, value: number) => {
    event({ category: 'dashboard', action: 'click', label: 'tab-change', value: value });
    this.setState({ selectedTabIndex: value });
  }

  handleChangeIndex = (index: number) => this.setState({ selectedTabIndex: index });

  productUrlChange = (e) => {
    this.inputValidation(e.target.value);
    this.setState({ urlInput: e.target.value });
  }

  addProduct = () => {
    event({ category: 'dashboard', action: 'click', label: 'add-product' });
    this.props.addUserProduct({ productUrl: this.state.urlInput })
    .then(() => this.props.getUserProducts())
    .then(() => {
      this.setState({ urlInput: '' });
      toast.success('Product has been added')
    })
    .catch((err) => {
      toast.error(get(err, 'response.data.message'))
    })
  }

  inputValidation = (value) => {
    const { protocol, hostname, href } = url.parse(value)
    const isValid = protocol && hostname && href;
    this.setState({ isProductInputError: !isValid });
  }

  render () {
    const { selectedTabIndex, urlInput, isProductInputError } = this.state;
    const isAdmin = this.props.auth.currentUser && this.props.auth.currentUser.role === 'admin';

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
                        <Tab label="Add product" />
                        {isAdmin && <Tab label="Website selectors" />}
                      </Tabs>
                      <SwipeableViews index={selectedTabIndex} onChangeIndex={this.handleChangeIndex} className="swipeable-views">
                        <div className="my-products">
                          My products:  {this.props.products.userProducts.length}
                          <Paper>
                            <ProductsList products={this.props.products.userProducts}/>
                          </Paper>
                        </div>
                        <div>
                          <h2>
                            Paste in link to the product.
                            {/* {urlInput ? (this.props.products.productExistence ? `This product exist` : 'This product does not exist!') : 'Paste in link to product.'} */}
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
                            error={isProductInputError}
                            helperText="Invalid link."
                            onKeyPress={this.handleKeyPress}
                          />
                          <Button disabled={!urlInput || isProductInputError} onClick={this.addProduct}> Add product </Button>
                      </div>
                      {isAdmin && <WebsiteAndProductsManagement />}
                    </SwipeableViews>
                  </div>
              </div>
          </Layout>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  addUserProduct: bindActionCreators(addUserProduct, dispatch),
  getUserProducts: bindActionCreators(getUserProducts, dispatch),
  deleteUserProduct: bindActionCreators(deleteUserProduct, dispatch),

});

export default connect(state => state, mapDispatchToProps)(defaultPage(Dashboard));