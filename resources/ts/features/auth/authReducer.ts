import { User } from '@/features/user/userTypes';
import { SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL, LOGIN_USER, LOGOUT_USER, LOGIN_ERROR, LOGIN_LOADING } from './authTypes';
import { LoginActionTypes } from './authTypes';

interface AuthState {
    isLoginModalVisible: boolean;
    isLoading: boolean;
    user: User | null,
    error: string | null,
};

const initialState: AuthState = {
  isLoginModalVisible: false,
  isLoading: false,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  error: null,
};

const authReducer = (state = initialState, action: LoginActionTypes) => {
  switch (action.type) {
  case SHOW_LOGIN_MODAL:
    return { ...state, isLoginModalVisible: true };
  case HIDE_LOGIN_MODAL:
    return { ...state, isLoginModalVisible: false, error: null };
  case LOGIN_USER:
    return { ...state, user: action.payload, error: null }
  case LOGOUT_USER:
    return { ...state,user: null, error: null };
  case LOGIN_ERROR:
    return { ...state, error: action.payload };
  case LOGIN_LOADING:
    return { ...state, isLoading: action.payload };
  default:
    return state;
  }
};

export default authReducer;