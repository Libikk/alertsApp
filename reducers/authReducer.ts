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
      case 'LOGOUT':
        console.log('LOGOUT: ');
        return Object.assign({}, state, {
            currentUser: null,
        });
      default: return state;
    }
  };


  export default scansReducer;

