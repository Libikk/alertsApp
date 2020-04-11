import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import defaultPage from '../components/Auth/defaultPage';
import { addUserProduct, getUserProducts } from '../dispatchers/productDispatchers';
import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import ProductsList from '../components/Shared/ProductsList';
import WebsiteAndProductsManagement from '../components/Shared/WebsiteAndProductsManagement';
import ProductsManagement from '../components/Shared/ProductsManagement';
import SwipeableViews from 'react-swipeable-views';
import url from 'url';
import { event } from 'react-ga';
import '../styles/dashboard.scss';
import get from 'lodash/get';
import useWindowWidth from '../hooks/windowWidthHook';

interface ProductExistenceObj {
  productId: number,
  productUrl: string,
  hostName: string,
  productName: string | null,
  createdAt: string,
  isProductActive: number,
  isPromo: number
}

type Products = {
  productExistence: ProductExistenceObj | null,
  userProducts: Array<ProductExistenceObj>,
}

const Dashboard = () =>  {  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserProducts());
  }, [])

  const [urlInput, setUrlInput] = useState<string>('')
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(1);
  const [isProductInputError, setIsProductInputError] = useState<boolean>(false);
  const auth = useSelector(state => state.auth);
  const products = useSelector<Products>(state => state.products);
  const isAdmin = auth.currentUser && auth.currentUser.role === 'admin';
  const { isMobileView } = useWindowWidth();

  const handleKeyPress = (event) => event.key === 'Enter' && addProduct();
  
  const handleChange = (e: React.ChangeEvent<{}>, value: number) => {
    event({ category: 'dashboard', action: 'click', label: 'tab-change', value: value });
    setSelectedTabIndex(value);
  }

  const handleChangeIndex = (index: number) => setSelectedTabIndex(index)

  const productUrlChange = (e) => {
    inputValidation(e.target.value);
    setUrlInput(e.target.value);
  }

  const addProduct = () => {
    event({ category: 'dashboard', action: 'click', label: 'add-product' });
    dispatch(addUserProduct({ productUrl: urlInput }))
      .then(() => dispatch(getUserProducts()))
      .then(() => {
        setUrlInput('');
        toast.success('Product has been added')
      })
      .catch((err) => {
        toast.error(get(err, 'response.data.message'))
      })
  }

  const inputValidation = (value) => {
    const { protocol, hostname, href } = url.parse(value)
    const isValid = protocol && hostname && href;
    setIsProductInputError(!isValid);
  }

    return (
      <Layout title="DDiscount Hero  | Dashboard">
          <div className='dashboard-container'>
              <div className='header'>
                <h1>
                    Dashboard
                </h1>
              </div>
              <div className='content'>
              </div>
                <div>
                  <Tabs value={selectedTabIndex} onChange={handleChange} {...(isMobileView ? { orientation: "vertical", centered: true, variant: 'fullWidth' } : {})}>
                    <Tab label="My products" />
                    <Tab label="Add product" />
                    {isAdmin && <Tab label="Websites" />}
                    {isAdmin && <Tab label="Products" />}
                  </Tabs>
                  <SwipeableViews index={selectedTabIndex} onChangeIndex={handleChangeIndex} className="swipeable-views">
                    <div className="my-products">
                      My products:  {products.userProducts.length}
                      <Paper>
                        <ProductsList products={products.userProducts}/>
                      </Paper>
                    </div>
                    <div>
                      <h2>Paste in link to the product.</h2>
                      <TextField
                        label="Product URL"
                        name="urlInput"
                        type="email"
                        fullWidth
                        placeholder='Enter direct url to the product'
                        value={urlInput}
                        onChange={productUrlChange}
                        InputLabelProps={{ shrink: true }}
                        error={isProductInputError}
                        helperText="Invalid link."
                        onKeyPress={handleKeyPress}
                      />
                      <Button disabled={!urlInput || isProductInputError} onClick={addProduct}> Add product </Button>
                  </div>
                  {isAdmin && <WebsiteAndProductsManagement />}
                  {isAdmin && <ProductsManagement />}
                </SwipeableViews>
              </div>
          </div>
      </Layout>
    )
}

export default defaultPage(Dashboard);