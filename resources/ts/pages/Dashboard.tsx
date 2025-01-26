import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import PageHeader from "../components/common/PageHeader";
import Table from "../components/common/Table";
import TaskCard from "../components/dashboard/TaskCard";
import { getUserTasks } from '../features/task/taskActions';
import { Task } from '../features/task/taskTypes';
import { AppDispatch, RootState } from '../store';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const headers: TableHeader[] = [
    { name: 'ID', key: 'id' },
    { name: 'NAME', key: 'name' },
    { name: 'DESCRIPTION', key: 'description' },
    { name: 'STATUS', key: 'status' },
    { name: 'DUE DATE', key: 'due_date' },
    { name: 'CREATE DATE', key: 'created_at' },
  ];
  const userTasks = useSelector((state: RootState) => state.task.userTasks);
  const transformedTasks = (userTasks as Task[]).map((task: Task) => ({
    id: task.id,
    name: task.name,
    description: task.description,
    status: task.status,
    due_date: format(task.due_date, 'M-dd-yyyy'),
    created_at: format(task.created_at, 'M-dd-yyyy'),
  }));

  useEffect(() => {
    getUserTasks(dispatch); 
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="Dashboard"
      />
      <div className="lg:max-w-[75%] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between w-full py-4">
          <TaskCard
            title="Pending Tasks"
            titleColor="text-yellow-500"
            userTasks={3}
            totalTasks={5}
          />
          <TaskCard
            title="In Progress Tasks"
            titleColor="text-blue-500"
            userTasks={3}
            totalTasks={5}
          />
          <TaskCard
            title="Completed Tasks"
            titleColor="text-green-500"
            userTasks={3}
            totalTasks={5}
          />
        </div>
        <div className="w-full p-6 bg-gray-800">
          <h2 className="text-xl mb-4">My Active Tasks</h2>
          <Table headers={headers} rows={transformedTasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;