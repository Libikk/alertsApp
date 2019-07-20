const initialState = {
    currentUser: null,
  };

  const scansReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
          console.log('action: ', action);
        return Object.assign({}, state, {
            currentUser: action.payload,
        });
      default: return state;
    }
  };


  export default scansReducer;

