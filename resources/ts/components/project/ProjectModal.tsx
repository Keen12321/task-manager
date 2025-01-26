import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ProjectModalProps, ProjectPayload } from '../../features/project/projectTypes';

const ProjectModal = ({
  isOpen,
  isLoading,
  error,
  onClose,
  onSubmit,
  projectToEdit,
  isEditMode,
}: ProjectModalProps) => {
  const [name, setName] = useState(projectToEdit?.name || '');
  const [description, setDescription] = useState(projectToEdit?.description || '');
  const [dueDate, setDueDate] = useState(projectToEdit?.due_date ? format(new Date(projectToEdit.due_date), 'yyyy-MM-dd') : '');
  const [status, setStatus] = useState(projectToEdit?.status || 'pending');

  useEffect(() => {
    setName(projectToEdit?.name || '');
    setDescription(projectToEdit?.description || '');
    setDueDate(projectToEdit?.due_date ? format(new Date(projectToEdit.due_date), 'yyyy-MM-dd') : '');
    setStatus(projectToEdit?.status || 'pending');
  }, [error, projectToEdit]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const projectData: ProjectPayload = {
      name,
      description,
      due_date: new Date(dueDate),
      status,
    };
    
    onSubmit(projectData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full sm:w-96 md:w-1/2 lg:w-1/3 text-gray-600 text-sm block">
        <h2 className="text-xl font-semibold border-b-2 border-gray-400 px-6 py-4">
          { isEditMode ? 'Update Project' : 'Create Project' }
        </h2>
        <div className="px-6 py-4">

          {error && <div className="text-red-500 mb-4">{ error }</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="font-medium">Name</label>
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
              <label htmlFor="description" className="font-medium">Description</label>
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
              <label htmlFor="dueDate" className="font-medium">Due Date</label>
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
              <label htmlFor="status" className="font-medium">Status</label>
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
                className="bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              >
                { isLoading ? 'Saving...' : isEditMode ? 'Update Project' : 'Create Project' }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
