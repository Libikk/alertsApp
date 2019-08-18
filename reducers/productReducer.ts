const initialState = {
    productExistence: null,
    userProducts: []
  };

  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CHECK_PRODUCT_EXISTENCE':
        return Object.assign({}, state, { productExistence: action.prodData });

      case 'GET_USER_PRODUCTS':
        return Object.assign({}, state, { userProducts: action.prodData });

      case 'DELETE_USER_PRODUCT':
        const filteredProducts = state.userProducts.filter(singleProd => singleProd.productId !== action.productId);
        return Object.assign({}, state, { userProducts: filteredProducts });

      default: return state;
    }
  };


  export default productsReducer;

