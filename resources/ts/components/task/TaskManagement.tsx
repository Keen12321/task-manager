import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import DeleteConfirmationDialog from "../common/modals/DeleteConfirmationDialog";
import PageHeader from "../common/PageHeader";
import Table from "../common/table/Table";
import TaskModal from "./TaskModal";
import { createTask, deleteTask, findTask, updateTask } from "../../features/task/taskActions";
import { Task, TaskPayload } from "../../features/task/taskTypes";
import { AppDispatch, RootState } from "../../store";
import { TableHeader } from "@/features/common/table/tableTypes";
  
const TaskManagementPage = ({ title, fetchTasks, tasksSelector }: TaskManagementProps) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); 
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const tasks = useSelector(tasksSelector);
  const taskToEdit = useSelector((state: RootState) => state.task.selectedTask);

  const headers: TableHeader[] = [
    { name: 'ID', key: 'id'},
    { name: 'PROJECT NAME', key: 'project_name' },
    { name: 'NAME', key: 'name', width: 30 },
    { name: 'STATUS', key: 'status', width: 15 },
    { name: 'DUE DATE', key: 'due_date' , width: 15 },
    { name: '', key: 'actions' }, 
  ]
    
  // Transform tasks for the table
  const transformedTasks = useMemo(() => tasks.map((task: Task) => ({
    id: task.id,
    project_name: task.project.name,
    name: task.name,
    status: task.status,
    due_date: format(task.due_date, 'M-dd-yyyy'),
  })), [tasks]);

  const handleModalToggle = useCallback((id: number | null = null) => {
    setIsEditMode(!!id);
    setIsModalOpen(true);
    if (id) {
      dispatch(findTask(id));
    } else {
      setSelectedTask(null);
    }
  }, [dispatch]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setIsEditMode(false);
  }, []);

  const openDeleteDialog = (id: number) => {
    setDeleteItemId(id);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => setIsDialogOpen(false);

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
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    }
  };

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      dispatch(deleteTask(deleteItemId));
    }
    closeDeleteDialog();
  };

  // Set the selected task whenever taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setSelectedTask(taskToEdit);
    }
  }, [taskToEdit]);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [dispatch, fetchTasks]);


  return (
    <div>
      <PageHeader title={title} emitAddNew={() => handleModalToggle()} />
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
        <Table
          headers={headers}
          rows={transformedTasks}
          dataType="task"
          onUpdate={handleModalToggle}
          onDelete={openDeleteDialog}
        />
      </div>
    </div>
  );
};
  
export default TaskManagementPage;
  