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
export const FIND_PROJECT = 'FIND_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
  
// Action Interfaces
interface CreateProjectAction {
    type: typeof CREATE_PROJECT;
    payload: Project;
}

interface GetProjectsAction {
    type: typeof GET_PROJECTS;
    payload: Project[];
}

interface FindProjectAction {
    type: typeof FIND_PROJECT;
    payload: Project;
}

interface UpdateProjectAction {
    type: typeof UPDATE_PROJECT;
    payload: Project;
}

interface DeleteProjectAction {
    type: typeof DELETE_PROJECT;
    payload: number;
}

// Action Type Union
export type ProjectActionTypes = 
    | CreateProjectAction
    | GetProjectsAction
    | FindProjectAction
    | UpdateProjectAction
    | DeleteProjectAction;
  
// Modal Props Interface
interface ProjectModalProps {
    isOpen: boolean;
    error?: string | null;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectPayload) => void;
    projectToEdit?: Project | null;
    isEditMode?: boolean;
}

// Modal Types
type Project = {
    id: number,
    name: string;
    description: string;
    due_date: Date;
    status: string;
    created_at: Date;
}
  
// Export types and interfaces
export type { ProjectPayload, ProjectModalProps, Project };