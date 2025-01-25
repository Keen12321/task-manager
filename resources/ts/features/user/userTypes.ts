// Payload Interface
interface LoginPayload {
    email: string;
    password: string;
}

interface UserPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

// Action Types
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const CREATE_USER = 'CREATE_USER';
export const GET_USERS = 'GET_USERS';
  
// Action Interfaces
export interface UserLoginAction {
    type: typeof LOGIN_USER;
    payload: LoginPayload;
}

export interface UserLogoutAction {
    type: typeof LOGOUT_USER;
}

export interface CreateUserAction {
    type: typeof CREATE_USER;
    payload: UserPayload;
}

export interface GetUsersAction {
    type: typeof GET_USERS;
    payload: User[];
}

// Action Type Union
export type UserActionTypes = UserLoginAction
    | UserLogoutAction
    | CreateUserAction
    | GetUsersAction;
  
// Modal Props Interface
interface LoginModalProps {
    isOpen: boolean;
    error?: string | null;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (data: LoginPayload) => void;
}

interface CreateUserModalProps {
    isOpen: boolean;
    error?: string | null;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (data: UserPayload) => void;
}

// Modal Types
type User = {
    id: number,
    name: string;
    email: string;
    created_at: Date;
}
  
// Export types and interfaces
export type { LoginPayload, UserPayload, LoginModalProps, CreateUserModalProps, User };