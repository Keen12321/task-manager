import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProject, updateProject } from '@/features/project/projectActions';
import { findTask, updateTask } from '@/features/task/taskActions';
import { TableStatusButtonProps } from '@/features/table/tableTypes';
import { AppDispatch, RootState } from '@/store';

const TableStatusButton = ({ row, dataType }: TableStatusButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [statusDropdownPosition, setStatusDropdownPosition] = useState({ top: 0, left: 0 });
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const taskToEdit = useSelector((state: RootState) => state.task.selectedTask);
  const projectToEdit = useSelector((state: RootState) => state.project.selectedProject);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Status colors and options
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow',
    in_progress: 'bg-blue',
    completed: 'bg-green',
  };
  const statusOptions = ['pending', 'in_progress', 'completed'];

  const formatStatus = (status: string) => status.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
  
  // Load task or project data based on type
  const loadItem = () => {
    if (dataType === 'task') {
      dispatch(findTask(row.id));
    } else if (dataType === 'project') {
      dispatch(findProject(row.id));
    }
  };
    
  // Toggle dropdown visibility and position
  const handleButtonClick = () => {
    if (buttonRef.current) {
      const { top, left, width } = buttonRef.current.getBoundingClientRect();
      setStatusDropdownPosition({
        top: top + 40,
        left: left + window.scrollX + width / 2,
      });
    }

    loadItem();
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Update status for task or project
  const handleStatusChange = (newStatus: string) => {
    const updatedItem = dataType === 'task' ? taskToEdit : projectToEdit;
    if (updatedItem?.id) {
      const updatedItemData = { ...updatedItem, status: newStatus };
      dispatch(dataType === 'task' ? updateTask(updatedItem.id, updatedItemData) : updateProject(updatedItem.id, updatedItemData));
    }

    setIsDropdownVisible(false);
  };

  // Close dropdown on scroll or mouse leave
  useEffect(() => {
    const handleScroll = () => {
      if (isDropdownVisible) {
        setIsDropdownVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDropdownVisible]);

  return (
    <div className="relative text-center" onMouseLeave={() => setIsDropdownVisible(false)}>
      <button
        ref={buttonRef}
        className={`px-4 py-2 rounded-full ${ statusColors[row.status as keyof typeof statusColors] } text-white inline-flex whitespace-nowrap justify-center focus:outline-none`}
        onClick={handleButtonClick}
      >
        { formatStatus(row.status) }
      </button>

      {isDropdownVisible && (
        <div
          className="fixed flex flex-col text-white p-2 pt-0 bg-gray-100 border-2 border-t-0 border-gray-300 rounded shadow-md z-10 max-w-xs sm:max-w-full"
          style={{ top: `${ statusDropdownPosition.top}px`, left: `${statusDropdownPosition.left }px`, transform: 'translateX(-50%)',
          }}
        >
          {statusOptions.map((status) => (
            row.status !== status && (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-4 py-2 mt-2 rounded-full inline-flex whitespace-nowrap justify-center
                    ${ status === 'pending' ? 'bg-yellow' : status === 'in_progress' ? 'bg-blue' : 'bg-green' }`}
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
