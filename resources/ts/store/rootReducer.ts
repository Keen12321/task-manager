import { combineReducers } from 'redux';
import tableReducer from '../features/common/table/tableReducer';
import projectReducer from '../features/project/projectReducer';
import taskReducer from '../features/task/taskReducer';
import userReducer from '../features/user/userReducer';

const rootReducer = combineReducers({
  table: tableReducer,
  project: projectReducer,
  task: taskReducer,
  user: userReducer,
});

export default rootReducer;