import React from 'react'
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import defaultPage from '../components/Auth/defaultPage';
import { bindActionCreators } from 'redux';
import { checkProdExistence, addUserProduct, getUserProducts, deleteUserProduct } from '../dispatchers/productDispatchers';
import '../styles/dashboard.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import ProductsList from '../components/Shared/ProductsList';
import WebsiteAndProductsManagement from '../components/Shared/WebsiteAndProductsManagement';
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
    .then(() => this.props.checkProdExistence(this.state.urlInput))
  }

  render () {
    const { selectedTabIndex, urlInput } = this.state;
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
                      {isAdmin && <WebsiteAndProductsManagement />}
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
  deleteUserProduct: bindActionCreators(deleteUserProduct, dispatch),

});

export default connect(state => state, mapDispatchToProps)(defaultPage(Dashboard));