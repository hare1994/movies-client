import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ username: string, password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: any }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const signup = createAction('[Auth] Signup', props<{ username: string, password: string }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ user: any }>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: any }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: any }>());
