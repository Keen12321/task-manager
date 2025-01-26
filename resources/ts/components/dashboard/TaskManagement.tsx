import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import DeleteConfirmationDialog from "../common/modals/DeleteConfirmationDialog";
import PageHeader from "../common/PageHeader";
import Table from "../common/Table";
import TaskModal from "../task/TaskModal";
import { createTask, deleteTask, findTask, updateTask } from "../../features/task/taskActions";
import { Task, TaskPayload } from "../../features/task/taskTypes";
import { AppDispatch, RootState } from "../../store";
  
const TaskManagementPage = ({
  title,
  fetchTasks,
  tasksSelector,
}: TaskManagementProps) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); 
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const headers = [
    { name: 'ID', key: 'id' },
    { name: 'NAME', key: 'name' },
    { name: 'DESCRIPTION', key: 'description' },
    { name: 'STATUS', key: 'status' },
    { name: 'DUE DATE', key: 'due_date' },
    { name: 'CREATE DATE', key: 'created_at' },
    { name: '', key: 'actions' },
  ]
  
  const tasks = useSelector(tasksSelector);
  const taskToEdit = useSelector((state: RootState) => state.task.selectedTask);
    
  const transformedTasks = (tasks as Task[]).map((task: Task) => ({
    id: task.id,
    name: task.name,
    description: task.description,
    status: task.status,
    due_date: format(task.due_date, 'M-dd-yyyy'),
    created_at: format(task.created_at, 'M-dd-yyyy'),
  }));
  
  const openModal = (id: number | null = null) => {
    if (id) {
      dispatch(findTask(id));
    } else {
      setSelectedTask(null);
    }
    setIsEditMode(!!id);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setIsEditMode(false);
  };
  
  const openDeleteDialog = (id: number) => {
    setDeleteItemId(id);
    setIsDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
  };
  
  const handleSubmit = async (taskData: TaskPayload) => {
    setIsLoading(true);
    setError(null);
  
    try {
      if (isEditMode && selectedTask) {
        await dispatch(updateTask(selectedTask.id, taskData));
      } else {
        await dispatch(createTask(taskData));
      }
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
  
  const handleConfirmDelete = () => {
    if (deleteItemId) {
      dispatch(deleteTask(deleteItemId));
    }
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (taskToEdit) {
      setSelectedTask(taskToEdit);
    }
  }, [taskToEdit]);
  
  useEffect(() => {
    fetchTasks();
  }, [dispatch, fetchTasks]);
  
  return (
    <div>
      <PageHeader title={title} emitAddNew={() => openModal()} />
      <TaskModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        error={error}
        onClose={closeModal}
        onSubmit={handleSubmit}
        taskToEdit={selectedTask}
        isEditMode={isEditMode}
      />
      <DeleteConfirmationDialog
        isOpen={isDialogOpen}
        dialogHeader="Delete Task"
        dialogText="Are you sure you want to delete this task?"
        onCancel={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
      <div className="lg:max-w-[75%] mx-auto py-4">
        <Table headers={headers} rows={transformedTasks} onUpdate={openModal} onDelete={openDeleteDialog} />
      </div>
    </div>
  );
};
  
export default TaskManagementPage;
  