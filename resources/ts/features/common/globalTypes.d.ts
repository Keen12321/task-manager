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

  interface DeleteConfirmationDialogProps {
    isOpen: boolean;
    dialogHeader: string;
    dialogText?: string;
    onCancel: () => void;
    onConfirm: () => void;
  }
}


export {};