import { combineReducers } from 'redux';
import userReducer from '../features/user/userReducer';
import projectReducer from '../features/project/projectReducer';

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
});

export default rootReducer;