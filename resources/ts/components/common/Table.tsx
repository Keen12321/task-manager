import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Table = <RowData extends { id: number; [key: string]: React.ReactNode }>({
  headers,
  rows,
  onUpdate,
  onDelete,
}: TableProps<RowData> & { onUpdate?: (id: number) => void, onDelete?: (id: number) => void }) => {
  const renderCell = (row: RowData , headerKey: string) => {
    let value = row[headerKey as keyof RowData];

    if (headerKey === 'actions') {
      return (
        <div className="flex justify-end">
          {onUpdate && (
            <button
              onClick={() => onUpdate(row.id)}
              className="text-blue-600 hover:text-blue-800 bg-gray-50 border-0 outline-none focus:outline-none"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(row.id)}
              className="text-red-600 hover:text-red-800 bg-gray-50 border-0 outline-none focus:outline-none"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          )}
        </div>
      );
    }

    return value ?? '';
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-600">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 text-left">{ header.name }</th>
            ))}
          </tr>
        </thead>

        <tbody className="text-gray-900 bg-gray-50">
          {rows.map((row, index) => (
            <tr key={index}>
              {headers.map((header, colIndex) => (
                <td className="px-6 py-3" key={colIndex}>{ renderCell(row, header.key) }</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;