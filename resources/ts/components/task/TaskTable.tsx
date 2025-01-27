import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import DeleteConfirmationDialog from "../common/modals/DeleteConfirmationDialog";
import PageHeader from "../common/PageHeader";
import Table from "../common/table/Table";
import TaskModal from "./TaskModal";
import { createTask, deleteTask, findTask, updateTask } from "@/features/task/taskActions";
import { Task, TaskManagementProps, TaskPayload } from "@/features/task/taskTypes";
import { AppDispatch, RootState } from "@/store";
  
const TaskTable = ({ pageTitle, headers, tasks }: TaskManagementProps) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); 
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const taskToEdit = useSelector((state: RootState) => state.task.selectedTask);

  // Transform tasks for the table
  const transformedTasks = useMemo(() => tasks.map((task: Task) => ({
    id: task.id,
    project_name: task.project?.name || '',
    project_id: task.project?.id || null,
    name: task.name,
    status: task.status,
    due_date: format(task.due_date, 'M-dd-yyyy'),
  })), [tasks]);

  // Open the task modal for edit or create
  const handleModalToggle = useCallback((id: number | null = null) => {
    setIsEditMode(!!id);
    setIsModalOpen(true);
    if (id) {
      dispatch(findTask(id));
    } else {
      setSelectedTask(null);
    }
  }, [dispatch]);

  // Close the project modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setIsEditMode(false);
  }, []);

  // Open the delete confirmation dialog
  const openDeleteDialog = (id: number) => {
    setDeleteItemId(id);
    setIsDialogOpen(true);
  };

  // Close the delete confirmation dialog
  const closeDeleteDialog = () => setIsDialogOpen(false);

  // Handle submit for create or update task
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
      setSelectedTask(null);
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    }
  };

  // Handle delete task
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

  return (
    <div>
      { pageTitle && <PageHeader title={pageTitle} emitAddNew={() => handleModalToggle()} /> }
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
      <div className={`${ pageTitle ? 'lg:max-w-[75%] mx-auto py-4' : '' }`}>
        {transformedTasks.length === 0 ? (
          <p className="p-4 lg:p-0">No tasks available.</p>
        ) : (
          <Table
            headers={headers}
            rows={transformedTasks}
            dataType="task"
            onUpdate={handleModalToggle}
            onDelete={openDeleteDialog}
          />
        )}
      </div>
    </div>
  );
};
  
export default TaskTable;
  