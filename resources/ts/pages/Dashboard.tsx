import { useEffect, useMemo, } from 'react';
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

  const userTasks = useSelector((state: RootState) => state.task.userTasks);
  const totalTasks = useSelector((state: RootState) => state.task.tasks);

  // Table headers
  const headers: TableHeader[] = [
    { name: 'ID', key: 'id' },
    { name: 'PROJECT NAME', key: 'project_name', width: 25 },
    { name: 'NAME', key: 'name', width: 30 },
    { name: 'STATUS', key: 'status'},
    { name: 'DUE DATE', key: 'due_date' },
  ];
  
  // Transform tasks for the table
  const transformedTasks = useMemo(() =>
    userTasks.map((task: Task) => ({
      id: task.id,
      project_name: task.project.name,
      name: task.name,
      status: task.status,
      due_date: format(task.due_date, 'M-dd-yyyy'),
    })), [userTasks]
  );
  
  // Calculate task status counts
  const calculateStatusCounts = (tasks: Task[]) => {
    return tasks.reduce(
      (counts, task) => {
        if (task.status === 'pending') counts.pending += 1;
        if (task.status === 'in_progress') counts.inProgress += 1;
        if (task.status === 'completed') counts.completed += 1;
        return counts;
      },
      { pending: 0, inProgress: 0, completed: 0 }
    );
  }
  
  // Calculate task counts
  const filteredUserTasks = useMemo(() => calculateStatusCounts(userTasks), [userTasks]);
  const filteredTotalTasks = useMemo(() => calculateStatusCounts(totalTasks), [totalTasks]);

  // Fetch tasks on mount
  useEffect(() => {
    getTasks(dispatch);
    getUserTasks(dispatch); 
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="lg:max-w-[75%] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between w-full py-4">
          {['Pending', 'In Progress', 'Completed'].map((status, index) => (
            <TaskCard
              key={status}
              title={`${status} Tasks`}
              titleColor={index === 0 ? 'text-yellow' : index === 1 ? 'text-blue' : 'text-green'}
              userTasks={filteredUserTasks[status.toLowerCase().replace(' ', '') as keyof typeof filteredUserTasks] || 0}
              totalTasks={filteredTotalTasks[status.toLowerCase().replace(' ', '') as keyof typeof filteredTotalTasks] || 0}
            />
          ))}
        </div>
        <div className="w-full p-6 bg-gray-800">
          <h2 className="text-xl mb-4">My Active Tasks</h2>
          <Table headers={headers} rows={transformedTasks} dataType="task" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;