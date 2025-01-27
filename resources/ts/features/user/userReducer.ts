import { CREATE_USER, GET_USERS, HIDE_USER_MODAL, SHOW_USER_MODAL, User, UserActionTypes } from './userTypes'

interface UserState {
  isUserModalVisible: boolean;
  currentUser: User | null;
  users: User[];
}

const initialState: UserState = {
  isUserModalVisible: false,
  currentUser: null,
  users: [],
};
  
const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
  case SHOW_USER_MODAL:
    return { ...state, isUserModalVisible: true };
  case HIDE_USER_MODAL:
    return { ...state, isUserModalVisible: false };
  case CREATE_USER:
    return { ...state, users: [...state.users, action.payload] };
  case GET_USERS:
    return { ...state, users: action.payload };
  default:
    return state;
  }
};
  
export default userReducer;