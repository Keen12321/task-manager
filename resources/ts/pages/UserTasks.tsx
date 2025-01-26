import { useDispatch } from 'react-redux';
import { getUserTasks} from '../features/task/taskActions';
import TaskManagementPage from '../components/dashboard/TaskManagement';
import { AppDispatch, RootState } from '../store';

const UserTasks = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TaskManagementPage 
      title="My Tasks"
      fetchTasks={() => dispatch(getUserTasks)}
      tasksSelector={(state: RootState) => state.task.userTasks}
    />
  );
};


export default UserTasks;