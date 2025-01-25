import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify'; 
import { CREATE_PROJECT, GET_PROJECTS, ProjectPayload } from './projectTypes';

export const createProject = (projectData: ProjectPayload) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post('/api/create-project', projectData);

    dispatch({
      type: CREATE_PROJECT,
      payload: response.data,
    });
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string[]>>;
  
    const errorMessage = axiosError.response?.data.errors
      ? Object.values(axiosError.response.data.errors).flat().join(', ')
      : 'An error occurred while creating the project';
  
    throw new Error(errorMessage);
  }
};
  
export const getProjects = async (dispatch: Dispatch) => {
  try {
    const response = await axios.get('/api/projects');
      
    dispatch({
      type: GET_PROJECTS,
      payload: response.data,
    })
  } catch (error) {
    toast.error('There was an error getting projects.')
  }
}