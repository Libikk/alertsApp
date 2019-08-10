const initialState = {
    productExistence: null,
  };

  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CHECK_PRODUCT_EXISTENCE':
        console.log('action.prodData: ', action.prodData);
        return Object.assign({}, state, { productExistence: action.prodData });

      default: return state;
    }
  };


  export default productsReducer;

