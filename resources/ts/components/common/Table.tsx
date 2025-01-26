import TableStatusButton from './TableStatusButton';
import TableActions from './TableActions';

const Table = <RowData extends { id: number; [key: string]: React.ReactNode }>({
  headers,
  rows,
  dataType,
  onUpdate,
  onDelete,
}: TableProps<RowData>) => {

  const renderCell = (row: RowData , headerKey: string) => {
    let value = row[headerKey as keyof RowData];

    if (headerKey === 'actions') {
      return (
        <TableActions
          onUpdate={() => onUpdate?.(row.id)}
          onDelete={() => onDelete?.(row.id)}
        />
      );
    }

    if (headerKey === 'status') {
      return (
        <TableStatusButton
          row={{ id: row.id, status: String(value)  }}
          dataType={ dataType }
        />
      );
    }

    return value ?? '';
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-600">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white text-left">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`px-6 py-3 ${header.key === 'status' ? 'text-center' : ''}`}
                style={{ width: header.width + '%' || 'auto' }}>
                { header.name }
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-gray-900 bg-gray-50">
          {rows.map((row, index) => (
            <tr key={index}>
              {headers.map((header, colIndex) => (
                <td
                  className="px-6 py-3"
                  key={colIndex}
                  style={{ width: header.width || 'auto' }}>
                  { renderCell(row, header.key) }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;