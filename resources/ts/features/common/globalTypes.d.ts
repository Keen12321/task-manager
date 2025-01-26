declare global {
  declare module '*.css';

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

  interface TableProps<RowData> {
    headers: TableHeader[];
    rows: RowData[];
    dataType: 'task' | 'project';
    onUpdate?: (id: number) => void;
    onDelete?: (id: number) => void;
  }

  interface TableStatusButtonProps {
    row: { id: number; status: string };
    dataType: 'task' | 'project';
  }

  interface TableActionsProps {
    onUpdate?: () => void;
    onDelete?: () => void;
  }

  interface TaskCardProps {
    title: string;
    titleColor?: string;
    userTasks: number;
    totalTasks: number;
  }

  interface PageHeaderProps {
    title: string;
    emitAddNew?: () => void;
  }
  
  type TaskManagementProps = {
    title: string;
    fetchTasks: () => void;
    tasksSelector: (state: RootState) => Task[];
  };

  interface DeleteConfirmationDialogProps {
    isOpen: boolean;
    dialogHeader: string;
    dialogText?: string;
    onCancel: () => void;
    onConfirm: () => void;
  }
}


export {};