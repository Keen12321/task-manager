import { Project } from "../project/projectTypes";
import { User } from "../user/userTypes";

// Payload Interface
interface TaskPayload {
    name: string;
    description: string;
    status: string;
    priority: string;
    due_date: Date;
    assigned_to: string;
    project_id: string;
}

// Action Types
export const CREATE_TASK = 'CREATE_TASK';
export const GET_TASKS = 'GET_TASKS';
export const GET_USER_TASKS = 'GET_USER_TASKS';
  
// Action Interfaces
export interface CreateTaskAction {
    type: typeof CREATE_TASK;
    payload: TaskPayload;
}

export interface GetTasksAction {
    type: typeof GET_TASKS;
    payload: Task[];
}

export interface GetUserTasksAction {
    type: typeof GET_USER_TASKS;
    payload: Task[];
}

// Action Type Union
export type TaskActionTypes = 
    | CreateTaskAction
    | GetTasksAction
    | GetUserTasksAction;
  
// Modal Props Interface
interface CreateTaskModalProps {
    isOpen: boolean;
    error?: string | null;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (data: TaskPayload) => void;
}

// Modal Types
type Task = {
    id: number,
    name: string;
    description: string;
    status: string;
    priority: string;
    due_date: Date;
    created_at: Date;
    assigned_to: User;
    project_id: Project;
}
  
// Export types and interfaces
export type { TaskPayload, CreateTaskModalProps, Task };