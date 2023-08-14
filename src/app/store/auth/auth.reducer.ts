import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  user: any | null;
  error: any | null;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    user: null,
    error,
  })),
  on(AuthActions.signupSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user, // Update the user with the new logged-in user data
    error: null,
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    user: null,
    error,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    isLoggedIn: false,
    user: null,
    error: null,
  }))
);
