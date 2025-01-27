import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { setFilter } from '@/features/table/tableActions';
import { TableFiltersProps } from '@/features/table/tableTypes';
import { RootState } from '@/store';
import 'react-datepicker/dist/react-datepicker.css';

const TableFilters = ({ headers, dataType }: TableFiltersProps) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.table.filters);
  const location = useLocation();

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setFilter({ key, value }));
  };

  const formatHeader = (name: string) => name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());

  const resetFilters = () => {
    if (filters?.dataType !== dataType) {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          dispatch(setFilter({ key, value: '' }));
        }
      }
    }
  };

  // Handle DatePicker change
  const handleDateChange = (key: string, date: Date | null) => {
    const formattedDate = date ? date.toISOString().split('T')[0] : '';
    dispatch(setFilter({ key, value: formattedDate }));
  };
  
  // Reset filters when page changes (detect route changes)
  useEffect(() => {
    resetFilters();
  }, [location, dispatch, dataType]);

  return (
    <div className="flex flex-wrap mb-4 gap-4 p-4 lg:p-0">
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
            ) : header.key === 'created_at' || header.key === 'due_date' ? (
              <div className="flex">
                <DatePicker
                  selected={filters[`start_${ header.key }`] ? new Date(filters[`start_${ header.key }`]) : null}
                  onChange={(date: Date | null) => handleDateChange(`start_${header.key}`, date)}
                  className="border rounded p-2 w-24 mr-4"
                  dateFormat="M-dd-yyyy"
                  placeholderText="Select Start"
                />
                <DatePicker
                  selected={filters[`end_${ header.key }`] ? new Date(filters[`end_${ header.key }`]) : null}
                  onChange={(date: Date | null) => handleDateChange(`end_${ header.key }`, date)}
                  className="border rounded w-24 p-2"
                  dateFormat="M-dd-yyyy"
                  placeholderText="Select End"
                />
              </div>
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
