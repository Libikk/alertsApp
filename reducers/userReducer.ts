const initialState = {
    userId: null,
    userName: '',
    userEmail: '',
  };

  const scansReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_USER_DATA':
        console.log('GET_USER_DATA action.userData: ', action.userData);
        return Object.assign({}, state, { ...action.userData });

      default: return state;
    }
  };


  export default scansReducer;

