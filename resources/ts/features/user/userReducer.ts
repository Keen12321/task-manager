import { CREATE_USER, GET_USERS, LOGIN_USER, LOGOUT_USER, User, UserActionTypes } from './userTypes'

interface UserState {
  currentUser: User | null;
  users: User[];
}

const initialState: UserState = {
  currentUser: null,
  users: [],
};
  
const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
  case LOGIN_USER:
    return { ...state, currentUser: action.payload }
  case LOGOUT_USER:
    return { ...state, currentUser: null }
  case CREATE_USER:
    return { ...state, users: [...state.users, action.payload] };
  case GET_USERS:
    return { ...state, users: action.payload };
  default:
    return state;
  }
};
  
export default userReducer;