import { SET_SORT, SET_FILTER, TableActionTypes, SortPayload } from './tableTypes';


interface Filters {
  sort: SortPayload;
  filters: {
    [key: string]: string; 
  }
};

const initialState: Filters = {
  sort: { key: '', direction: 'asc' },
  filters: {
    status: '',
    name: ''
  },
}

const tableReducer = (state = initialState, action: TableActionTypes) => {
  switch (action.type) {
  case SET_SORT:
    return {
      ...state,
      sort: action.payload,
    };
  case SET_FILTER:
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.key]: action.payload.value,
      },
    };
  default:
    return state;
  }
};

export default tableReducer;