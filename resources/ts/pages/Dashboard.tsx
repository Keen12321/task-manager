import { useEffect, useMemo, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from "@/components/common/PageHeader";
import TaskCard from "@/components/task/TaskCard";
import { getTasks, getUserTasks } from '@/features/task/taskActions';
import { Task } from '@/features/task/taskTypes';
import TaskTable from '@/components/task/TaskTable';
import { TableHeader } from '@/features/table/tableTypes';
import { AppDispatch, RootState } from '@/store';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userTasks = useSelector((state: RootState) => state.task.userTasks);
  const totalTasks = useSelector((state: RootState) => state.task.tasks);

  const headers: TableHeader[] = [
    { name: 'ID', key: 'id', width: 10 },
    { name: 'PROJECT NAME', key: 'project_name', width: 20 },
    { name: 'NAME', key: 'name', width: 30 },
    { name: 'STATUS', key: 'status' },
    { name: 'DUE DATE', key: 'due_date' },
  ];

  // Calculate task status counts
  const calculateStatusCounts = (tasks: Task[]) => {
    return tasks.reduce(
      (counts, task) => {
        if (task.status === 'pending') counts.pending += 1;
        if (task.status === 'in_progress') counts.in_progress  += 1;
        if (task.status === 'completed') counts.completed += 1;
        return counts;
      },
      { pending: 0, in_progress : 0, completed: 0 }
    );
  }
  
  // Calculate task counts
  const filteredUserTasks = useMemo(() => calculateStatusCounts(userTasks), [userTasks]);
  const filteredTotalTasks = useMemo(() => calculateStatusCounts(totalTasks), [totalTasks]);

  // Fetch tasks on mount
  useEffect(() => {
    dispatch(getUserTasks()); 
    dispatch(getTasks());
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
              userTasks={filteredUserTasks[status.toLowerCase().replace(' ', '_') as keyof typeof filteredUserTasks] || 0}
              totalTasks={filteredTotalTasks[status.toLowerCase().replace(' ', '_') as keyof typeof filteredTotalTasks] || 0}
            />
          ))}
        </div>
        <div className="w-full lg:p-6 bg-darkBlue">
          <h2 className="text-xl mb-4 p-4 lg:p-0">My Active Tasks</h2>
          <TaskTable
            headers={headers}
            tasks={userTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;