import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskTable from '@/components/task/TaskTable';
import { getTasks} from '@/features/task/taskActions';
import { TableHeader } from '@/features/table/tableTypes';
import { AppDispatch, RootState } from '@/store';

const AllTasks = () => {
  const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector((state: RootState) => state.task.tasks);

  const headers: TableHeader[] = [
    { name: 'ID', key: 'id', width: 10 },
    { name: 'PROJECT NAME', key: 'project_name' },
    { name: 'NAME', key: 'name', width: 20 },
    { name: 'STATUS', key: 'status' },
    { name: 'DUE DATE', key: 'due_date', width: 16 },
    { name: '', key: 'actions'}
  ];

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <TaskTable
      pageTitle="All Tasks"
      headers={headers}
      tasks={tasks}
    />
  );
};

export default AllTasks