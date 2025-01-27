import { LOGOUT_USER } from "../auth/authTypes";
import { CREATE_TASK, DELETE_TASK, FIND_TASK, GET_PROJECT_TASKS, GET_TASKS, GET_USER_TASKS, Task, TaskActionTypes, UPDATE_TASK } from "./taskTypes";

interface TaskState {
  tasks: Task[];
  userTasks: Task[];
  projectTasks: Task[];
  selectedTask: Task | null
}

const initialState: TaskState = {
  tasks: [],
  userTasks: [],
  projectTasks: [],
  selectedTask: null
};
  
const userReducer = (state = initialState, action: TaskActionTypes) => {
  switch (action.type) {
  case CREATE_TASK:
    return {
      ...state,
      tasks: [...state.tasks, action.payload],
      userTasks: [...state.userTasks, action.payload],
      projectTasks: [...state.projectTasks, action.payload],
    };
  case GET_TASKS:
    return { ...state, tasks: action.payload };
  case FIND_TASK:
    return { ...state, selectedTask: action.payload };
  case GET_USER_TASKS:
    return { ...state, userTasks: action.payload };
  case GET_PROJECT_TASKS:
    return { ...state, projectTasks: action.payload };
  case UPDATE_TASK:
    return {
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      ),
      userTasks: state.userTasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      ),
    };
  case DELETE_TASK:
    return {
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.payload),
      userTasks: state.userTasks.filter((task) => task.id !== action.payload)
    };

  case LOGOUT_USER:
    return { ...state, userTasks: [] };
  default:
    return state;
  }
};
  
export default userReducer;