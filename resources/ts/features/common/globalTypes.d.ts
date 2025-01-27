declare global {
  declare module '*.css';

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