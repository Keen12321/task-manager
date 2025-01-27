// Payload Interface
interface LoginPayload {
    email: string;
    password: string;
}

// Action Types
export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL';
export const HIDE_LOGIN_MODAL = 'HIDE_LOGIN_MODAL';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_LOADING = 'LOGIN_LOADING';

// Action Interfaces
interface ShowLoginModalAction {
    type: typeof SHOW_LOGIN_MODAL;
    isLoginModalVisible: true;
}

interface HideLoginModalAction {
    type: typeof HIDE_LOGIN_MODAL;
    isLoginModalVisible: false;
}

export interface LogoutAction {
    type: typeof LOGOUT_USER;
}

export interface LoginAction {
    type: typeof LOGIN_USER;
    payload: LoginPayload;
}

interface LoginErrorAction {
    type: typeof LOGIN_ERROR;
    payload: string;
}

interface LoginLoadingAction {
    type: typeof LOGIN_LOADING;
    payload: boolean;
}


// Action Type Union
export type LoginActionTypes = 
    | ShowLoginModalAction
    | HideLoginModalAction
    | LoginAction
    | LogoutAction
    | LoginErrorAction
    | LoginLoadingAction;

// Export types and interfaces
export type { LoginPayload };