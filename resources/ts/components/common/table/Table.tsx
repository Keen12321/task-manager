import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableStatusButton from './TableStatusButton';
import TableActions from './TableActions';
import TableFilters from './TableFilters';
import { setSort } from '@/features/table/tableActions';
import { TableProps } from '@/features/table/tableTypes';
import { RootState } from '@/store';
import { Link } from 'react-router-dom';

const Table = <RowData extends { id: number; [key: string]: React.ReactNode }>({
  headers,
  rows,
  dataType,
  onUpdate,
  onDelete,
}: TableProps<RowData>) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { sort, filters } = useSelector((state: RootState) => state.table);

  // Utility to render cell content based on header key
  const renderCell = (row: RowData, headerKey: string) => {
    let value = row[headerKey as keyof RowData];

    switch (headerKey) {
    case 'actions':
      return <TableActions onUpdate={() => onUpdate?.(row.id)} onDelete={() => onDelete?.(row.id)} />;
    case 'project_name':
      return <Link to={`/project/${ row.project_id }`} className="text-blue hover:underline">{ value }</Link>;
    case 'status':
      return <TableStatusButton row={{ id: row.id, status: String(value) }} dataType={dataType} />;
    default:
      return value ?? '';
    }
  };

  // Handle table sort
  const handleSort = (key: string) => {
    const direction = sort.key === key && sort.direction === 'asc' ? 'desc' : 'asc';
    dispatch(setSort({ key, direction }));
  };

  // Apply sorting, filtering, and pagination logic with useMemo for optimization
  const filteredRows = useMemo(() => {
    // Step 1: Sort the rows first
    const sortedRows = [...rows].sort((a, b) => {
      const valueA = a[sort.key as keyof RowData] ?? '';
      const valueB = b[sort.key as keyof RowData] ?? '';
      return sort.direction === 'asc' ? (valueA < valueB ? -1 : 1) : (valueA > valueB ? -1 : 1);
    });

    // Step 2: Apply the filters
    const filtered = sortedRows.filter((row) =>
      Object.keys(filters).every((filterKey) => {
        const filterValue = filters[filterKey];
      
        if (!filterValue) return true;

        // Case for date range filter (for example, created_at or due_date)
        if (filterKey.startsWith('start_') || filterKey.startsWith('end_')) {
          const dateFilterKey = filterKey.replace(/^start_|^end_/, '');
          const filterDate = new Date(filterValue);
          let rowDate: Date | null = null;

          const rowValue = row[dateFilterKey]; 
          
          // Check if the row value exists and is a valid date string or timestamp
          if (rowValue && (typeof rowValue === 'string' || typeof rowValue === 'number')) {
            // Try parsing the row value as a valid date
            const parsedDate = new Date(rowValue);
            if (!isNaN(parsedDate.getTime())) {
              rowDate = parsedDate;
            }
          }
          
          // If rowDate is not a valid date, we skip this filter comparison
          if (!rowDate) return false;
          
          if (filterKey.startsWith('start_') && rowDate < new Date(filterDate)) return false;
          if (filterKey.startsWith('end_') && rowDate > new Date(filterDate)) return false;
          
          console.log(filterKey.startsWith('start_') && rowDate < new Date(filterDate))
          return true;
        }
        
        // Regular text filters (e.g., status, name)
        const rowValue = String(row[filterKey as keyof RowData] ?? '').toLowerCase();
        return rowValue.includes(filterValue.toLowerCase());
      })
    );

    // Step 3: Adjust the current page if it exceeds the number of available pages
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    return filtered;
  }, [rows, filters, sort, currentPage, itemsPerPage]);

  // Pagination logic: Calculate the rows for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset page to 1 when rows change (such as during sorting/filtering)
  useEffect(() => {
    setCurrentPage(1);
  }, [rows, filters]);

  return (
    <div className="rounded-lg overflow-x-auto pb-10">
      {/* Filter UI */}
      <TableFilters headers={headers} dataType={dataType} />

      {/* Desktop Layout */}
      <table className="min-w-full table-auto hidden sm:table border border-gray-600">
        <thead className="bg-darkBlue text-white text-left">
          <tr>
            {headers.map((header, index) => {
              if (header.key === 'actions') {
                return (
                  <th key={index} className="px-6 py-3"></th>
                );
              } 

              return (
                <th
                  key={index}
                  className="px-6 py-3 cursor-pointer"
                  style={{ width: header.width + '%' || 'auto' }}
                  onClick={() => handleSort(header.key)}
                >
                  <div className={`flex items-center ${ header.key === 'status' ? 'justify-center' : '' }`}>
                    <span className='mr-2'>{ header.name }</span>
                    {sort.key === header.key ? (
                      sort.direction === 'asc' ? (<span style={{ display: 'block' }}>🔽</span>)
                        : (<span style={{ display: 'block' }}>🔼</span>)
                    ) : (
                      <span>🔼</span>
                    )}
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody className="text-gray-900 bg-gray-50">
          {currentRows.map((row, index) => (
            <tr key={index}>
              {headers.map((header, colIndex) => (
                <td className="px-6 py-3" key={colIndex} style={{ width: header.width + '%' || 'auto' }}>
                  { renderCell(row, header.key) }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Layout */}
      <div className="block sm:hidden">
        {currentRows.map((row, index) => (
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
      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-gray-600 py-2 px-4 rounded-md w-24"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='mx-4'>
          Page { currentPage } of { totalPages }
        </span>
        <button
          className="bg-gray-600 py-2 px-4 rounded-md w-24"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
