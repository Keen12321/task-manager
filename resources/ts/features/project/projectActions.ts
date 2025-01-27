import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify'; 
import { CREATE_PROJECT, DELETE_PROJECT, FIND_PROJECT, GET_PROJECTS, ProjectPayload, UPDATE_PROJECT } from './projectTypes';

export const createProject = (projectData: ProjectPayload) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post('/api/create-project', projectData);

    dispatch({
      type: CREATE_PROJECT,
      payload: response.data,
    });

    toast.success('Project created successfully.');
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string[]>>;
  
    const errorMessage = axiosError.response?.data.errors
      ? Object.values(axiosError.response.data.errors).flat().join('\n')
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

export const findProject = (id: number) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`/api/project/${id}`);
      
    dispatch({
      type: FIND_PROJECT,
      payload: response.data,
    })
  } catch (error) {
    toast.error('There was an error finding project.')
  }
}

export const updateProject = (id: number, projectData: ProjectPayload) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.put(`/api/project/${id}`, projectData);

    dispatch({
      type: UPDATE_PROJECT,
      payload: response.data,
    });

    toast.success('Project updated successfully.');
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string[]>>;

    const errorMessage = axiosError.response?.data.errors
      ? Object.values(axiosError.response.data.errors).flat().join('\n')
      : 'An error occurred while updating the project';

    throw new Error(errorMessage);
  }
};

export const deleteProject = (id: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`/api/project/${id}`);

    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });

    toast.success('Project deleted successfully.');
  } catch (error) {
    toast.error('There was an error deleting the project.');
  }
};