// movies.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import {AuthState} from "../auth/auth.reducer";
import {MoviesState} from "./movies.reducer";

// Selector to access the auth state
export const selectMoviesState = createFeatureSelector<MoviesState>('movies');

export const selectMovies = createSelector(
  selectMoviesState,
  (state: MoviesState) => state.movies
);


export const selectFavorites = createSelector(
  selectMoviesState,
  (state) => state.favorites
);


