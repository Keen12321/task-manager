import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify'; 
import { CREATE_TASK, DELETE_TASK, FIND_TASK, GET_TASKS, GET_USER_TASKS, TaskPayload, UPDATE_TASK } from './taskTypes';

export const createTask = (taskData: TaskPayload) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post('/api/create-task', taskData);

    dispatch({
      type: CREATE_TASK,
      payload: response.data,
    });

    toast.success('Task created successfully.');
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string[]>>;
  
    const errorMessage = axiosError.response?.data.errors
      ? Object.values(axiosError.response.data.errors).flat().join(', ')
      : 'An error occurred while creating the task';
  
    throw new Error(errorMessage);
  }
};
  
export const getTasks = async (dispatch: Dispatch) => {
  try {
    const response = await axios.get('/api/tasks');
      
    dispatch({
      type: GET_TASKS,
      payload: response.data,
    })
  } catch (error) {
    toast.error('There was an error getting tasks.')
  }
}

export const findTask = (id: number) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`/api/task/${id}`);
      
    dispatch({
      type: FIND_TASK,
      payload: response.data,
    })
  } catch (error) {
    toast.error('There was an error finding task.')
  }
}

export const getUserTasks = async (dispatch: Dispatch) => {
  try {
    const response = await axios.get('/api/user-tasks');
      
    dispatch({
      type: GET_USER_TASKS,
      payload: response.data,
    })
  } catch (error) {
    toast.error('There was an error getting tasks.')
  }
}

export const updateTask = (id: number, taskData: TaskPayload) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.put(`/api/task/${id}`, taskData);

    dispatch({
      type: UPDATE_TASK,
      payload: response.data,
    });

    toast.success('Task updated successfully.');
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string[]>>;

    const errorMessage = axiosError.response?.data.errors
      ? Object.values(axiosError.response.data.errors).flat().join(', ')
      : 'An error occurred while updating the task';

    toast.error(errorMessage);
  }
};

export const deleteTask = (id: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`/api/task/${id}`);

    dispatch({
      type: DELETE_TASK,
      payload: id,
    });

    toast.success('Task deleted successfully.');
  } catch (error) {
    toast.error('There was an error deleting the task.');
  }
};