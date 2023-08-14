import {createReducer, on} from '@ngrx/store';
import * as MoviesActions from './movies.actions';
import {Movie} from "../../models/movie.model";

export interface MoviesState {
  movies: any,
  favorites: any
}

export const initialMovieState: MoviesState = {
  movies: [],
  favorites: []
};

export const moviesReducer = createReducer(
  initialMovieState,
  on(MoviesActions.loadMoviesSuccess, (state, {movies}) => ({...state, movies})),

  on(MoviesActions.favoriteMovieSuccess, (state, {message, movieId}) => {
    const updatedMovies = state.movies.paginatedMovies.map((movie: { id: string; }) =>
      movie.id === movieId
        ? { ...movie, isFavorite: true } // Update the isFavorite property
        : movie
    );

    return {
      ...state,
      movies: {paginatedMovies : updatedMovies, total: state.movies.total}
    };
  }),

  on(MoviesActions.favoriteMovieFailure, (state, {error}) => {
    return state;
  }),

  on(MoviesActions.unfavoriteMovieSuccess, (state, {message, movieId}) => {
    const updatedMovies = state.movies.paginatedMovies.map((movie: { id: string; }) =>
      movie.id === movieId
        ? { ...movie, isFavorite: false } // Update the isFavorite property
        : movie
    );

    const indexOfFavoriteMovieToRemove = state.favorites.findIndex((movie: { id: any; }) => movie.id === movieId);
    const updatedFavorites = state.favorites.filter((item: any, index: number) => index !== indexOfFavoriteMovieToRemove);

    return {
      ...state,
      movies: {paginatedMovies : updatedMovies, total: state.movies.total},
      favorites: updatedFavorites
    };
  }),

  on(MoviesActions.unfavoriteMovieFailure, (state, {error}) => {
    return state;
  }),

  on(MoviesActions.loadFavoritesSuccess, (state, {favorites}) => ({...state, favorites})),
);

