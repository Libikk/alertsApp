const initialState = {
  websitesList: null,
};

const websitesReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'GET_ALL_WEBSITES_WITH_PRODUCTS':
      return Object.assign({}, state, {
        websitesList: action.websites,
      });
    default: return state;
  }
};


export default websitesReducer;
