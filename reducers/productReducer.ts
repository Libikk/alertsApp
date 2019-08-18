const initialState = {
    productExistence: null,
    userProducts: []
  };

  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CHECK_PRODUCT_EXISTENCE':
        return Object.assign({}, state, { productExistence: action.prodData });
      case 'GET_USER_PRODUCTS':
        console.log('action.prodData: ', action.prodData);
        return Object.assign({}, state, { userProducts: action.prodData });
      default: return state;
    }
  };


  export default productsReducer;

