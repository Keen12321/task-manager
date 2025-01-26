import { combineReducers } from 'redux';
import projectReducer from '../features/project/projectReducer';
import taskReducer from '../features/task/taskReducer';
import userReducer from '../features/user/userReducer';

const rootReducer = combineReducers({
  project: projectReducer,
  task: taskReducer,
  user: userReducer,
});

export default rootReducer;