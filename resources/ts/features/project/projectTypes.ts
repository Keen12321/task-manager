// Payload Interface
interface ProjectPayload {
    name: string;
    description: string;
    status: string;
    due_date: Date;
}

// Action Types
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GET_PROJECTS = 'GET_PROJECTS';
  
// Action Interfaces
export interface CreateUserAction {
    type: typeof CREATE_PROJECT;
    payload: ProjectPayload;
}

export interface GetProjectsAction {
    type: typeof GET_PROJECTS;
    payload: Project[];
}

// Action Type Union
export type ProjectActionTypes = 
    | CreateUserAction
    | GetProjectsAction;
  
// Modal Props Interface
interface CreateProjectModalProps {
    isOpen: boolean;
    error?: string | null;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectPayload) => void;
}

// Modal Types
type Project = {
    id: number,
    name: string;
    description: string;
    status: string;
    due_date: Date;
    created_at: Date;
}
  
// Export types and interfaces
export type { ProjectPayload, CreateProjectModalProps, Project };