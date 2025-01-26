import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { TaskModalProps, TaskPayload } from '../../features/task/taskTypes';
import { getUsers } from '../../features/user/userActions';
import { getProjects } from '../../features/project/projectActions';
import { AppDispatch, RootState } from '../../store';

const TaskModal = ({
  isOpen,
  isLoading,
  error,
  onClose,
  onSubmit,
  taskToEdit,
  isEditMode = false,
}: TaskModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState(taskToEdit?.name || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [status, setStatus] = useState(taskToEdit?.status || 'pending');
  const [priority, setPriority] = useState(taskToEdit?.priority || 'low');
  const [dueDate, setDueDate] = useState(taskToEdit?.due_date ? format(new Date(taskToEdit.due_date), 'yyyy-MM-dd') : '');
  const [assignedTo, setAssignedTo] = useState(taskToEdit?.assigned_to || '');
  const [projectId, setProjectId] = useState(taskToEdit?.project_id || '');

  const users = useSelector((state: RootState) => state.user.users);
  const projects = useSelector((state: RootState) => state.project.projects);

  useEffect(() => {
    if (isOpen) {
      dispatch(getUsers);
      dispatch(getProjects);
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    setName(taskToEdit?.name || '');
    setDescription(taskToEdit?.description || '');
    setStatus(taskToEdit?.status || 'pending');
    setPriority(taskToEdit?.priority || 'low');
    setDueDate(taskToEdit?.due_date ? format(new Date(taskToEdit.due_date), 'yyyy-MM-dd') : '');
    setAssignedTo(taskToEdit?.assigned_to || '');
    setProjectId(taskToEdit?.project_id || '');
  }, [error, taskToEdit]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const taskData: TaskPayload = {
      name,
      description,
      status,
      priority,
      due_date: new Date(dueDate),
      assigned_to: assignedTo,
      project_id: projectId,
    };

    onSubmit(taskData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full sm:w-96 md:w-1/2 lg:w-1/3 text-gray-600 text-sm block max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold border-b-2 border-gray-400 px-4 py-2">
          { isEditMode ? 'Update Task' : 'Create Task' }
        </h2>
        <div className="px-4 py-2">

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="projectId" className="font-medium">Project</label>
              <select
                id="projectId"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                required
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label htmlFor="name" className="font-medium">Task Name</label>
              <input
                id="name"
                type="text"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="description" className="font-medium">Task Description</label>
              <input
                id="description"
                type="text"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="dueDate" className="font-medium">Task Deadline</label>
              <input
                id="dueDate"
                type="date"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="status" className="font-medium">Task Status</label>
              <select
                id="status"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="mb-5">
              <label htmlFor="priority" className="font-medium">Task Priority</label>
              <select
                id="priority"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="mb-5">
              <label htmlFor="assignedTo" className="font-medium">Assign to</label>
              <select
                id="assignedTo"
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-2 focus:ring-gray-400"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-between py-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              >
                { isLoading ? 'Saving...' : isEditMode ? 'Update Task' : 'Create Task' }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
