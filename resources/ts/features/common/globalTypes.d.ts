declare global {
  declare module '*.css';

  type TableHeader = {
    name: string,
    key: string
  }

  type TableRow = {
    id: number;
    title: string;
    description: string;
    status: string;
    date: string;
  };

  interface TableProps<RowData> {
    headers: TableHeader[];
    rows: RowData[];
  }

  interface TaskCardProps {
    title: string;
    titleColor?: string;
    userTasks: number;
    totalTasks: number
  }

  interface PageHeaderProps {
    title: string;
    emitAddNew?: () => void;
  }
}


export {};