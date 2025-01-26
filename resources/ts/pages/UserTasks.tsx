import { useDispatch } from 'react-redux';
import { getUserTasks} from '../features/task/taskActions';
import TaskManagement from '../components/task/TaskManagement';
import { AppDispatch, RootState } from '../store';

const UserTasks = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TaskManagement
      title="My Tasks"
      fetchTasks={() => dispatch(getUserTasks)}
      tasksSelector={(state: RootState) => state.task.userTasks}
    />
  );
};


export default UserTasks;