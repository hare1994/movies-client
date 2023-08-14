// movies.actions.ts

import { createAction, props } from '@ngrx/store';

export const loadMovies = createAction(
  '[Movies] Load Movies',
  props<{ page: number; pageSize: number; search: string, genres: string }>()
);

export const loadMoviesSuccess = createAction(
  '[Movies] Load Movies Success',
  props<{ movies: any[] }>()
);

export const loadMoviesFailure = createAction(
  '[Movies] Load Movies Failure',
  props<{ error: any }>()
);

export const favoriteMovie = createAction(
  '[Movies] Favorite Movie',
  props<{ movieId: string; userId: string }>()
);

export const favoriteMovieSuccess = createAction(
  '[Movies] Favorite Movie Success',
  props<{ message: any, movieId: string }>()
);

export const favoriteMovieFailure = createAction(
  '[Movies] Favorite Movie Failure',
  props<{ error: any }>()
);

export const unfavoriteMovie = createAction(
  '[Movies] Unfavorite Movie',
  props<{ movieId: string; userId: string }>()
);

export const unfavoriteMovieSuccess = createAction(
  '[Movies] Unfavorite Movie Success',
  props<{ message: any, movieId: string }>()
);

export const unfavoriteMovieFailure = createAction(
  '[Movies] Unfavorite Movie Failure',
  props<{ error: any }>()
);

export const loadFavorites = createAction(
  '[Favorites] Load Favorites'
)

export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Favorites Success',
  props<{ favorites: any[] }>()
)

export const loadFavoritesFailure = createAction(
  '[Favorites] Load Favorites Failure',
  props<{ error: string }>()
)
