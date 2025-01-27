import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setFilter } from '@/features/common/table/tableActions';
import { TableFiltersProps } from '@/features/common/table/tableTypes';
import { RootState } from '@/store';


const TableFilters = ({ headers, dataType }: TableFiltersProps) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.table.filters);
  const location = useLocation();

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setFilter({ key, value }));
  };

  const formatHeader = (name: string) => {
    return name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }

  const resetFilters = () => {
    if (filters?.dataType !== dataType) {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          dispatch(setFilter({ key, value: '' }));
        }
      }
    }
  };
  
  // Reset filters when page changes (detect route changes)
  useEffect(() => {
    resetFilters();
  }, [location, dispatch, dataType]);

  return (
    <div className="flex flex-wrap mb-4 gap-4">
      {headers.map((header) => {
        if (header.key === 'actions' || header.key === 'id') return null;

        return (
          <div key={header.key} className="flex flex-col">
            <label htmlFor={header.key} className="mb-2">{ formatHeader(header.name) }</label>
            {header.key === 'status' ? (
              <select
                id={header.key}
                value={filters[header.key] || ''}
                onChange={(e) => handleFilterChange(header.key, e.target.value)}
                className="border rounded p-2"
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            ) : (
              <input
                type="text"
                id={header.key}
                value={filters[header.key] || ''}
                onChange={(e) => handleFilterChange(header.key, e.target.value)}
                placeholder={`Search ${ formatHeader(header.name) }`}
                className="border rounded p-2"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TableFilters;
