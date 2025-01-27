// Payload Interface
interface SortPayload {
    key: string;
    direction: 'asc' | 'desc'
}

interface FilterPayload {
    key: string;
    value: string
}

// Action Types
export const SET_SORT = 'SET_SORT';
export const SET_FILTER = 'SET_FILTER';

interface setSortAction {
    type: typeof SET_SORT;
    payload: SortPayload;
}

interface setFileterAction {
    type: typeof SET_FILTER;
    payload: FilterPayload;
}

export type TableActionTypes = 
    | setSortAction
    | setFileterAction;

// Modal Props Interface
type DataTypes = 'task' | 'project' | 'user'

interface TableProps<RowData> {
    headers: TableHeader[];
    rows: RowData[];
    dataType?: DataTypes;
    onUpdate?: (id: number) => void;
    onDelete?: (id: number) => void;
}

interface TableStatusButtonProps {
    row: { id: number; status: string };
    dataType?: DataTypes;
}

interface TableActionsProps {
    onUpdate?: () => void;
    onDelete?: () => void;
}

interface TableFiltersProps {
    headers: TableHeader[];
    dataType?: DataTypes;
}

// Modal Types
type TableHeader = {
    name: string;
    key: string;
    width?: number;
}

type TableRow = {
    id: number;
    title: string;
    description: string;
    status: string;
    date: string;
};

export type { SortPayload, FilterPayload, TableProps, TableStatusButtonProps, TableActionsProps, TableFiltersProps, TableHeader, TableRow };