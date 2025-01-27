import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskTable from '@/components/task/TaskTable';
import { TableHeader } from '@/features/table/tableTypes';
import { getUserTasks } from '@/features/task/taskActions';
import { AppDispatch, RootState } from '@/store';

const UserTasks = () => {
  const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector((state: RootState) => state.task.userTasks);

  const headers: TableHeader[] = [
    { name: 'ID', key: 'id', width: 10 },
    { name: 'PROJECT NAME', key: 'project_name' },
    { name: 'NAME', key: 'name', width: 20 },
    { name: 'STATUS', key: 'status' },
    { name: 'DUE DATE', key: 'due_date', width: 16 },
    { name: '', key: 'actions'}
  ];

  useEffect(() => {
    dispatch(getUserTasks());
  }, [dispatch]);

  return (
    <TaskTable
      pageTitle="My Tasks"
      headers={headers}
      tasks={tasks}
    />
  );
};


export default UserTasks;