import { combineReducers } from 'redux';
import tableReducer from '../features/table/tableReducer';
import projectReducer from '../features/project/projectReducer';
import taskReducer from '../features/task/taskReducer';
import userReducer from '../features/user/userReducer';
import authReducer from '@/features/auth/authReducer';

const rootReducer = combineReducers({
  table: tableReducer,
  project: projectReducer,
  task: taskReducer,
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;