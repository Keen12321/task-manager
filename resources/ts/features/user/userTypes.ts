// Payload Interface
interface UserPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

// Action Types
export const SHOW_USER_MODAL = 'SHOW_USER_MODAL';
export const HIDE_USER_MODAL = 'HIDE_USER_MODAL';
export const CREATE_USER = 'CREATE_USER';
export const GET_USERS = 'GET_USERS';
  
// Action Interfaces
interface ShowUserModalAction {
    type: typeof SHOW_USER_MODAL;
    isUserModalVisible: true;
}

interface HideUserModalAction {
    type: typeof HIDE_USER_MODAL;
    isUserModalVisible: false;
}

interface CreateUserAction {
    type: typeof CREATE_USER;
    payload: User;
}

interface GetUsersAction {
    type: typeof GET_USERS;
    payload: User[];
}

// Action Type Union
export type UserActionTypes =
    | ShowUserModalAction
    | HideUserModalAction
    | CreateUserAction
    | GetUsersAction;

// Modal Types
type User = {
    id: number,
    name: string;
    email: string;
    created_at: Date;
}
  
// Export types and interfaces
export type { UserPayload, User };