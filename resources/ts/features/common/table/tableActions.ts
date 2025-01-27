import { FilterPayload, SET_FILTER, SET_SORT, SortPayload } from "./tableTypes";


export const setSort = (payload: SortPayload) => ({
  type: SET_SORT,
  payload,
});

export const setFilter = (payload: FilterPayload) => ({
  type: SET_FILTER,
  payload,
});