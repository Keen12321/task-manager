import { useDispatch, useSelector } from 'react-redux';
import TableStatusButton from './TableStatusButton';
import TableActions from './TableActions';
import { setSort } from '@/features/common/table/tableActions';
import { TableProps } from '@/features/common/table/tableTypes';
import { RootState } from '@/store';
import TableFilters from './TableFilters';

const Table = <RowData extends { id: number; [key: string]: React.ReactNode }>(props: TableProps<RowData>) => {
  const dispatch = useDispatch();

  const { headers, rows, dataType, onUpdate, onDelete } = props;
  const { sort, filters } = useSelector((state: RootState) => state.table);

  const renderCell = (row: RowData, headerKey: string) => {
    let value = row[headerKey as keyof RowData];

    if (headerKey === 'actions') {
      return (
        <TableActions onUpdate={() => onUpdate?.(row.id)} onDelete={() => onDelete?.(row.id)} />
      );
    }

    if (headerKey === 'status') {
      return (
        <TableStatusButton row={{ id: row.id, status: String(value) }} dataType={dataType} />
      );
    };

    return value ?? '';
  };

  const handleSort = (key: string) => {
    const direction = sort.key === key && sort.direction === 'asc' ? 'desc' : 'asc';
    dispatch(setSort({ key, direction }));
  };

  // Apply sorting and filtering logic
  const sortedRows = [...rows].sort((a, b) => {
    const sortValueA = a[sort.key as keyof RowData] ?? '';
    const sortValueB = b[sort.key as keyof RowData] ?? '';

    if (sort.direction === 'asc') {
      return sortValueA < sortValueB ? -1 : 1;
    } else {
      return sortValueA > sortValueB ? -1 : 1;
    }
  });

  const filteredRows = sortedRows.filter((row) => {
    return Object.keys(filters).every((filterKey) => {
      const filterValue = filters[filterKey as keyof typeof filters];
      const rowValue = row[filterKey as keyof RowData];
      const rowStringValue = rowValue ? rowValue.toString().toLowerCase() : '';

      return rowStringValue.includes((filterValue ?? '').toLowerCase());
    });
  });

  console.log(filteredRows)

  return (
    <div className="shadow-lg rounded-lg overflow-x-auto">
      {/* Filter UI */}
      <TableFilters headers={headers} dataType={dataType} />

      {/* Desktop Layout */}
      <table className="min-w-full table-auto hidden sm:table border border-gray-600">
        <thead className="bg-gray-800 text-white text-left">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 cursor-pointer"
                style={{ width: header.width + '%' || 'auto' }}
                onClick={() => handleSort(header.key)}
              >
                <div className={`flex items-center ${header.key === 'status' ? 'justify-center' : ''}`}>
                  <span className='mr-2'>{ header.name }</span>
                  {sort.key === header.key ? (
                    sort.direction === 'asc' ? (
                      <span style={{ display: 'block' }}>🔽</span>
                    ) : (
                      <span style={{ display: 'block' }}>🔼</span>
                    )
                  ) : (
                    <span>🔼</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-gray-900 bg-gray-50">
          {filteredRows.map((row, index) => (
            <tr key={index}>
              {headers.map((header, colIndex) => (
                <td className="px-6 py-3" key={colIndex} style={{ width: header.width || 'auto' }}>
                  { renderCell(row, header.key) }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Layout */}
      <div className="block sm:hidden">
        {filteredRows.map((row, index) => (
          <div key={index} className="border-b border-gray-200 p-4">
            {headers.map((header, colIndex) => (
              <div key={colIndex} className="flex justify-between items-center mb-2">
                <span className="font-semibold">{ header.name }</span>
                <span>{ renderCell(row, header.key) }</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
