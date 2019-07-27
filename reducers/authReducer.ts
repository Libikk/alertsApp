
interface CurrentUser {
  userName: string,
  userId: number,
  email: string
}

interface InitialState {
  currentUser: null | CurrentUser
}

const initialState:InitialState = {
    currentUser: null,
  };

  const scansReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return Object.assign({}, state, {
            currentUser: action.payload,
        });
      case 'LOGOUT':
        return Object.assign({}, state, {
            currentUser: null,
        });
      default: return state;
    }
  };


  export default scansReducer;

