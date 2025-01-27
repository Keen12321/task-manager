import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify'; 
import { CREATE_PROJECT, DELETE_PROJECT, FIND_PROJECT, GET_PROJECTS, ProjectPayload, UPDATE_PROJECT } from './projectTypes';
import { setLoginModalVisibility } from '../auth/authActions';
import { AppDispatch } from '@/store';

export const createProject = (projectData: ProjectPayload) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post('/api/project', projectData);

    dispatch({ type: CREATE_PROJECT, payload: response.data });

    toast.success('Project created successfully.');
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, string[]>>;
  
    if (axiosError.response?.status === 401) {
      dispatch(setLoginModalVisibility(true));
      toast.error("You are not authenticated. Please log in.");
    } else {
      const errorMessage = axiosError.response?.data.errors
        ? Object.values(axiosError.response.data.errors).flat().join('\n')
        : 'An error occurred while creating the project';

      toast.error(errorMessage);
    }
  }
};
  
export const getProjects = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get('/api/projects');
      
    dispatch({ type: GET_PROJECTS, payload: response.data })
  } catch (error) {
    toast.error('There was an error getting projects.')
  }
}

export const findProject = (id: number | string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`/api/project/${id}`);
      
    dispatch({ type: FIND_PROJECT, payload: response.data })
  } catch (error) {
    toast.error('There was an error finding project.')
  }
}

export const updateProject = (id: number, projectData: ProjectPayload) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`/api/project/${id}`, projectData);

    dispatch({ type: UPDATE_PROJECT, payload: response.data });

    toast.success('Project updated successfully.');
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
};

export const deleteProject = (id: number) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`/api/project/${id}`);

    dispatch({ type: DELETE_PROJECT, payload: id });

    toast.success('Project deleted successfully.');
  } catch (error) {
    toast.error('There was an error deleting the project.');
  }
};