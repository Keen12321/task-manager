import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import CreateTaskModal from "../components/CreateTaskModal";
import PageHeader from "../components/PageHeader";
import { createTask, getTasks } from '../features/task/taskActions';
import { Task as TaskType, TaskPayload } from '../features/task/taskTypes';
import { AppDispatch, RootState } from '../store';
import Table from "../components/Table";

const AllTasks = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const headers: TableHeader[] = [
    { name: 'ID', key: 'id' },
    { name: 'NAME', key: 'name' },
    { name: 'DESCRIPTION', key: 'description' },
    { name: 'STATUS', key: 'status' },
    { name: 'DUE DATE', key: 'due_date' },
    { name: 'CREATE DATE', key: 'created_at' },
  ];
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const transformedTasks = (tasks as TaskType[]).map((task: TaskType) => ({
    id: task.id,
    name: task.name,
    description: task.description,
    status: task.status,
    due_date: format(task.due_date, 'M-dd-yyyy'),
    created_at: format(task.created_at, 'M-dd-yyyy'),
  }));


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateTask = async (taskData: TaskPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      await dispatch(createTask(taskData));
      setIsLoading(false);
      closeModal();
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    }
  };

  useEffect(() => {
    dispatch(getTasks);
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="Tasks"
        emitAddNew={openModal}
      />
      <CreateTaskModal
        isOpen={isModalOpen}
        isLoading={isLoading} 
        error={error}
        onClose={closeModal}
        onSubmit={handleCreateTask}
      />
      <div className="lg:max-w-[75%] mx-auto py-4">
        <Table headers={headers} rows={transformedTasks} />
      </div>
    </div>
  )
}

export default AllTasks;