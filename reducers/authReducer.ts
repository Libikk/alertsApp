import cloneDeep from 'lodash/cloneDeep';
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
      case 'SUCCESS_UPDATE_USER_DETAILS':
        if (action.newUserDetails.userName) {
          const clonedCurrentUser = cloneDeep(state.currentUser)
          clonedCurrentUser.userName = action.newUserDetails.userName
          return Object.assign({}, state, {
              currentUser: clonedCurrentUser,
          });
        }
      default: return state;
    }
  };


  export default scansReducer;

