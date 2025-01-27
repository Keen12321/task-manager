import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify'; 
import { CREATE_USER, GET_USERS, LOGIN_USER, LOGOUT_USER, LoginPayload, UserPayload } from './userTypes';

export const login = (loginData: LoginPayload) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post('/api/login', loginData);
    const token = response.data.token;

    if (token) {
      localStorage.setItem('userToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    dispatch({
      type: LOGIN_USER,
      payload: response.data.user,
    });

    toast.success('You have successfully logged in.');
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string>>;

    const errorMessage = 
      (axiosError).response?.data.message
      ?? 'An error occurred while logging in';

    throw new Error(errorMessage);
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    await axios.post('/api/logout');

    localStorage.removeItem('userToken');
    dispatch({
      type: LOGOUT_USER,
    });

    toast.success('You have successfully logged out.');
  } catch (error) {
    toast.error('There was an error logging you out. Please try again.');
  }
};

export const createUser = (userData: UserPayload) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post('/api/create-user', userData);
    const token = response.data.token;

    if (!localStorage.getItem('userToken') && token) {
      localStorage.setItem('userToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      dispatch({
        type: LOGIN_USER,
        payload: response.data.user,
      });
    }

    dispatch({
      type: CREATE_USER,
      payload: response.data.user,
    });
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string[]>>;

    const errorMessage = axiosError.response?.data.errors
      ? Object.values(axiosError.response.data.errors).flat().join('\n')
      : 'An error occurred while creating the user';

    throw new Error(errorMessage);
  }
};

export const getUsers = async (dispatch: Dispatch) => {
  try {
    const response = await axios.get('/api/users');
    
    dispatch({
      type: GET_USERS,
      payload: response.data,
    })
  } catch (error) {
    toast.error('There was an error getting users.')
  }
}