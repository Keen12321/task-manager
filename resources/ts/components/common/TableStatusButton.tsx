import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProject, updateProject } from '@/features/project/projectActions';
import { findTask, updateTask } from '@/features/task/taskActions';
import { AppDispatch, RootState } from '@/store';

const TableStatusButton = ({
  row,
  dataType,
}: TableStatusButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [statusDropdownPosition, setStatusDropdownPosition] = useState({ top: 0, left: 0 });

  const taskToEdit = useSelector((state: RootState) => state.task.selectedTask);
  const projectToEdit = useSelector((state: RootState) => state.project.selectedProject);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const statusColors = {
    pending: 'bg-yellow',
    in_progress: 'bg-blue',
    completed: 'bg-green',
  };

  const statusOptions = ['pending', 'in_progress', 'completed'];

  const formatStatus = (status: string) => {
    return status
      .replace('_', ' ') // Replace first underscore with a space
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
  };

  
  // Function to load the task or project data
  const loadItem = () => {
    if (dataType === 'task') {
      dispatch(findTask(row.id));
    } else if (dataType === 'project') {
      dispatch(findProject(row.id));
    }
  };
    
  // Function to display dropdown directly under status
  const handleButtonClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setStatusDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  
    setSelectedStatus(row.id);
    loadItem();
  };

  // Function to update status for task or project
  const handleStatusChange = (newStatus: string) => {
    let updatedItem;
    
    if (dataType === 'task' && taskToEdit?.id) {
      updatedItem = { ...taskToEdit, status: newStatus };
      dispatch(updateTask(updatedItem.id, updatedItem));
    } else if (dataType === 'project' && projectToEdit?.id) {
      updatedItem = { ...projectToEdit, status: newStatus };
      dispatch(updateProject(updatedItem.id, updatedItem));
    }

    setSelectedStatus(null);
  };


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setSelectedStatus(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-center">
      <button
        ref={buttonRef}
        className={`px-4 py-2 rounded-full ${statusColors[row.status as keyof typeof statusColors]} text-white text-center focus:outline-none`}
        onClick={handleButtonClick}
      >
        { formatStatus(row.status) }
      </button>

      {selectedStatus === row.id && (
        <div
          ref={dropdownRef}
          className="fixed flex flex-col text-white p-2 pt-0 bg-gray-100 border-2 border-t-0 border-gray-300 rounded shadow-md z-10 max-w-xs sm:max-w-full"
          style={{
            top: `${statusDropdownPosition.top}px`,
            left: `${statusDropdownPosition.left + (buttonRef.current?.offsetWidth || 0) / 2}px`,
            transform: 'translateX(-50%)',
          }}
        >
          {statusOptions.map((status) => (
            row.status !== status && (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`block px-4 py-2 mt-2 rounded-full text-center flex-grow
                    ${status === 'pending' ? 'bg-yellow' : status === 'in_progress' ? 'bg-blue' : 'bg-green'}`}
              >
                { formatStatus(status) }
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default TableStatusButton;
