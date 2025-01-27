import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify'; 
import { CREATE_USER, GET_USERS, HIDE_USER_MODAL, SHOW_USER_MODAL, UserPayload } from './userTypes';
import { LOGIN_USER } from '../auth/authTypes';
import { AppDispatch } from '@/store';

export const setUserModalVisibility = (isVisible: boolean) => ({
  type: isVisible ? SHOW_USER_MODAL : HIDE_USER_MODAL,
});

export const createUser = (userData: UserPayload) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post('/api/user', userData);
    const token = response.data.token;

    if (!localStorage.getItem('userToken') && token) {
      localStorage.setItem('userToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      dispatch({ type: LOGIN_USER, payload: response.data.user });
    }

    dispatch({ type: CREATE_USER, payload: response.data.user });

    dispatch(setUserModalVisibility(false));
    toast.success('You have successfully created a user.');

  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string[]>>;

    const errorMessage = axiosError.response?.data.errors
      ? Object.values(axiosError.response.data.errors).flat().join('\n')
      : 'An error occurred while creating the user';

    throw new Error(errorMessage);
  }
};

export const getUsers = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get('/api/users');
    
    dispatch({ type: GET_USERS, payload: response.data })
  } catch (error) {
    toast.error('There was an error getting users.')
  }
}