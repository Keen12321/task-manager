import { useDispatch } from 'react-redux';
import { getTasks} from '../features/task/taskActions';
import TaskManagementPage from '../components/dashboard/TaskManagement';
import { AppDispatch, RootState } from '../store';

const AllTasks = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TaskManagementPage 
      title="All Tasks"
      fetchTasks={() => dispatch(getTasks)}
      tasksSelector={(state: RootState) => state.task.tasks}
    />
  );
};

export default AllTasks