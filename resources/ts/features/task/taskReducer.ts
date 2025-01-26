import { CREATE_TASK, GET_TASKS, GET_USER_TASKS, Task, TaskActionTypes } from "./taskTypes";

interface TaskState {
  tasks: Task[];
  userTasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
  userTasks: [],
};
  
const userReducer = (state = initialState, action: TaskActionTypes) => {
  switch (action.type) {
  case CREATE_TASK:
    return { ...state, tasks: [...state.tasks, action.payload] };
  case GET_TASKS:
    return { ...state, tasks: action.payload };
  case GET_USER_TASKS:
    return { ...state, userTasks: action.payload };
  default:
    return state;
  }
};
  
export default userReducer;