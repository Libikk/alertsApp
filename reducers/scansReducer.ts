const initialState = {
  currentDiscounts: null,
};

const scansReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CURRENT_DISCOUNTS':
      return Object.assign({}, state, {
        currentDiscounts: action.currentDiscounts,
      });
    default: return state;
  }
};


export default scansReducer;

