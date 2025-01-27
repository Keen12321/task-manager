import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TableActionsProps } from '@/features/common/table/tableTypes';

const TableActions = ({ onUpdate, onDelete }: TableActionsProps) => {
  return (
    <div className="flex justify-end">
      {onUpdate && (
        <button
          onClick={() => onUpdate()}
          className="mx-1 text-blue hover:text-darkBlue bg-gray-50 border-0 outline-none focus:outline-none"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={() => onDelete()}
          className="mx-1 text-red-600 hover:text-red-800 bg-gray-50 border-0 outline-none focus:outline-none"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      )}
    </div>
  );
};

export default TableActions;
