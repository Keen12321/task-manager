import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify'; 
import { CREATE_TASK, DELETE_TASK, FIND_TASK, GET_PROJECT_TASKS, GET_TASKS, GET_USER_TASKS, TaskPayload, UPDATE_TASK } from './taskTypes';
import { setLoginModalVisibility } from '../auth/authActions';
import { AppDispatch } from '@/store';

export const createTask = (taskData: TaskPayload) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post('/api/task', taskData);

    dispatch({ type: CREATE_TASK, payload: response.data });

    toast.success('Task created successfully.');
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string[]>>;
  
    const errorMessage = axiosError.response?.data.errors
      ? Object.values(axiosError.response.data.errors).flat().join('\n')
      : 'An error occurred while creating the task';
  
    throw new Error(errorMessage);
  }
};
  
export const getTasks = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get('/api/tasks');
      
    dispatch({ type: GET_TASKS, payload: response.data })
  } catch (error) {
    toast.error('There was an error getting tasks.')
  }
}

export const getUserTasks = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`/api/tasks/user`);
      
    dispatch({ type: GET_USER_TASKS, payload: response.data })
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string[]>>;
    if (axiosError.response?.status === 401) {
      dispatch(setLoginModalVisibility(true));
      toast.error("You are not authenticated. Please log in.");
    } else {
      const errorMessage = axiosError.response?.data.errors
        ? Object.values(axiosError.response.data.errors).flat().join('\n')
        : 'An error occurred while updating the project';
    
      toast.error(errorMessage);
    }
  }
}

export const getProjectTasks = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`/api/tasks/project/${id}`);
      
    dispatch({ type: GET_PROJECT_TASKS, payload: response.data })
  } catch (error) {
    toast.error('There was an error getting tasks.')
  }
}

export const findTask = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`/api/task/${id}`);
      
    dispatch({ type: FIND_TASK, payload: response.data })
  } catch (error) {
    toast.error('There was an error finding task.')
  }
}


export const updateTask = (id: number, taskData: TaskPayload) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`/api/task/${id}`, taskData);

    dispatch({ type: UPDATE_TASK, payload: response.data });

    toast.success('Task updated successfully.');
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string[]>>;

    const errorMessage = axiosError.response?.data.errors
      ? Object.values(axiosError.response.data.errors).flat().join('\n')
      : 'An error occurred while updating the task';

    throw new Error(errorMessage);
  }
};

export const deleteTask = (id: number) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`/api/task/${id}`);

    dispatch({ type: DELETE_TASK, payload: id });

    toast.success('Task deleted successfully.');
  } catch (error) {
    toast.error('There was an error deleting the task.');
  }
};