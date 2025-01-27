import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify'; 
import { SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL, LOGIN_USER, LOGOUT_USER, LoginPayload, LOGIN_ERROR, LOGIN_LOADING } from './authTypes';
import { getUserTasks } from '../task/taskActions';
import { AppDispatch } from '@/store';

export const setLoginModalVisibility = (isVisible: boolean) => ({
  type: isVisible ? SHOW_LOGIN_MODAL : HIDE_LOGIN_MODAL,
});

export const login = (loginData: LoginPayload) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING, payload: true }); 

    const response = await axios.post('/api/login', loginData);
    const token = response.data.token;
  
    if (token) {
      localStorage.setItem('userToken', token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  
    dispatch({ type: LOGIN_USER, payload: response.data.user });
  
    dispatch(getUserTasks());

    dispatch(setLoginModalVisibility(false));
    toast.success('You have successfully logged in.');

    dispatch({ type: LOGIN_LOADING, payload: false }); 
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string>>;
  
    const errorMessage = axiosError.response?.data.message || 'An error occurred while logging in';
  
    dispatch({ type: LOGIN_ERROR, payload: errorMessage });

    dispatch({ type: LOGIN_LOADING, payload: false}); 
  }
};
  
export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await axios.post('/api/logout');
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    dispatch({ type: LOGOUT_USER });
  
    toast.success('You have successfully logged out.');
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: 'Error logging out. Please try again.' });
  }
};
  