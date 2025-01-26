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
export const FIND_TASK = 'FIND_TASK';
export const GET_USER_TASKS = 'GET_USER_TASKS';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
  
// Action Interfaces
interface CreateTaskAction {
    type: typeof CREATE_TASK;
    payload: Task;
}

interface GetTasksAction {
    type: typeof GET_TASKS;
    payload: Task[];
}

interface FindTaskAction {
    type: typeof FIND_TASK;
    payload: Task;
}

interface GetUserTasksAction {
    type: typeof GET_USER_TASKS;
    payload: Task[];
}

interface UpdateTaskAction {
    type: typeof UPDATE_TASK;
    payload: Task;
}

interface DeleteTaskAction {
    type: typeof DELETE_TASK;
    payload: number;
}

// Action Type Union
export type TaskActionTypes = 
    | CreateTaskAction
    | GetTasksAction
    | FindTaskAction
    | GetUserTasksAction
    | UpdateTaskAction
    | DeleteTaskAction;
  
// Modal Props Interface
interface TaskModalProps {
    isOpen: boolean;
    isLoading: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (taskData: TaskPayload) => void;
    taskToEdit?: Task | null;
    isEditMode?: boolean;
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
    assigned_to: string;
    project_id: string;
}
  
// Export types and interfaces
export type { TaskPayload, TaskModalProps, Task };