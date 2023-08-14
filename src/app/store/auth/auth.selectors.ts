// auth.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Selector to access the auth state
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Selector to get the isLoggedIn status from auth state
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoggedIn
);

// Selector to get the isLoggedIn status from auth state
export const selectLoggedInUserId = createSelector(
  selectAuthState,
  (state: AuthState) => state.user ? state.user.userId : null
);

// Selector to get the isLoggedIn status from auth state
export const selectLoggedInUsername = createSelector(
  selectAuthState,
  (state: AuthState) => state.user ? state.user.username : ''
);
