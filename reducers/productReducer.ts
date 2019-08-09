const initialState = {
    productExistence: null,
  };

  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CHECK_PRODUCT_EXISTENCE':
        return Object.assign({}, state, { productExistence: action.prodData });

      default: return state;
    }
  };


  export default productsReducer;

