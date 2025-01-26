import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const TableActions = ({ onUpdate, onDelete }: TableActionsProps) => {
  return (
    <div className="flex justify-end">
      {onUpdate && (
        <button
          onClick={() => onUpdate()}
          className="text-blue-600 hover:text-blue-800 bg-gray-50 border-0 outline-none focus:outline-none"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={() => onDelete()}
          className="text-red-600 hover:text-red-800 bg-gray-50 border-0 outline-none focus:outline-none"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      )}
    </div>
  );
};

export default TableActions;
