import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import PageHeader from "../components/common/PageHeader";
import Table from "../components/common/table/Table";
import TaskCard from "../components/dashboard/TaskCard";
import { getTasks, getUserTasks } from '../features/task/taskActions';
import { Task } from '../features/task/taskTypes';
import { AppDispatch, RootState } from '../store';
import { TableHeader } from '@/features/common/table/tableTypes';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [filteredUserTasks, setFilteredUserTasks] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
  })
  const [filteredTotalTasks, setFilteredTotalTasks] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
  })

  const headers: TableHeader[] = [
    { name: 'ID', key: 'id' },
    { name: 'PROJECT NAME', key: 'project', width: 25 },
    { name: 'NAME', key: 'name', width: 30 },
    { name: 'STATUS', key: 'status'},
    { name: 'DUE DATE', key: 'due_date' },
  ];

  const userTasks = useSelector((state: RootState) => state.task.userTasks);
  const totalTasks = useSelector((state: RootState) => state.task.tasks);
  
  const transformedTasks = (userTasks as Task[]).map((task: Task) => ({
    id: task.id,
    project: task.project.name,
    name: task.name,
    status: task.status,
    due_date: format(task.due_date, 'M-dd-yyyy'),
  }));

  useEffect(() => {
    const statusCounts = { pending: 0, inProgress: 0, completed: 0 };

    userTasks.forEach((task: Task) => {
      if (task.status === 'pending') statusCounts.pending += 1;
      if (task.status === 'in_progress') statusCounts.inProgress += 1;
      if (task.status === 'completed') statusCounts.completed += 1;
    });

    setFilteredUserTasks(statusCounts);
  }, [userTasks]);

  useEffect(() => {
    const statusCounts = { pending: 0, inProgress: 0, completed: 0 };

    totalTasks.forEach((task: Task) => {
      if (task.status === 'pending') statusCounts.pending += 1;
      if (task.status === 'in_progress') statusCounts.inProgress += 1;
      if (task.status === 'completed') statusCounts.completed += 1;
    });

    setFilteredTotalTasks(statusCounts);
  }, [totalTasks]);

  useEffect(() => {
    getTasks(dispatch);
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
            titleColor="text-yellow"
            userTasks={filteredUserTasks.pending}
            totalTasks={filteredTotalTasks.pending}
          />
          <TaskCard
            title="In Progress Tasks"
            titleColor="text-blue"
            userTasks={filteredUserTasks.inProgress}
            totalTasks={filteredTotalTasks.inProgress}
          />
          <TaskCard
            title="Completed Tasks"
            titleColor="text-green"
            userTasks={filteredUserTasks.completed}
            totalTasks={filteredTotalTasks.completed}
          />
        </div>
        <div className="w-full p-6 bg-gray-800">
          <h2 className="text-xl mb-4">My Active Tasks</h2>
          <Table headers={headers} rows={transformedTasks} dataType="task"/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;