import { CREATE_PROJECT, GET_PROJECTS, Project, ProjectActionTypes } from "./projectTypes";

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};
  
const userReducer = (state = initialState, action: ProjectActionTypes) => {
  switch (action.type) {
  case CREATE_PROJECT:
    return { ...state, projects: [...state.projects, action.payload] };
  case GET_PROJECTS:
    return { ...state, projects: action.payload };
  default:
    return state;
  }
};
  
export default userReducer;