import { CREATE_PROJECT, DELETE_PROJECT, FIND_PROJECT, GET_PROJECTS, Project, ProjectActionTypes, UPDATE_PROJECT } from "./projectTypes";

interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
};

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
};
  
const userReducer = (state = initialState, action: ProjectActionTypes) => {
  switch (action.type) {
  case CREATE_PROJECT:
    return { ...state, projects: [...state.projects, action.payload] };
  case GET_PROJECTS:
    return { ...state, projects: action.payload };
  case FIND_PROJECT:
    return { ...state, selectedProject: action.payload };
  case UPDATE_PROJECT:
    return {
      ...state,
      projects: state.projects.map((project) =>
        project.id === action.payload.id ? action.payload : project
      ),
    };
  case DELETE_PROJECT:
    return {
      ...state,
      projects: state.projects.filter((project) => project.id !== action.payload),
    };
  default:
    return state;
  }
};
  
export default userReducer;