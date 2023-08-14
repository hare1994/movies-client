// movies.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as MoviesActions from './movies.actions';
import { MoviesService } from '../../services/movies.service'
import {loadFavorites} from "./movies.actions";

@Injectable()
export class MoviesEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovies),
      switchMap((action) =>
        this.moviesService.getMovies(action.page, action.pageSize, action.search, action.genres).pipe(
          map((movies) => MoviesActions.loadMoviesSuccess({ movies })),
          catchError((error) => of(MoviesActions.loadMoviesFailure(error)))
        )
      )
    )
  );

  favoriteMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.favoriteMovie),
      switchMap((action) =>
        this.moviesService.favoriteMovie(action.userId, action.movieId).pipe(
          map((response) => MoviesActions.favoriteMovieSuccess({  message: response.message, movieId: response.movieId })),
          catchError((error) => of(MoviesActions.favoriteMovieFailure(error)))
        )
      )
    )
  );

  unfavoriteMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.unfavoriteMovie),
      switchMap((action) =>
        this.moviesService.unfavoriteMovie(action.userId, action.movieId).pipe(
          map((response) => MoviesActions.unfavoriteMovieSuccess({  message: response.message, movieId: response.movieId })),
          catchError((error) => of(MoviesActions.unfavoriteMovieFailure(error)))
        )
      )
    )
  );

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadFavorites),
      switchMap((action) =>
        this.moviesService.loadFavorites().pipe(
          map((response) => MoviesActions.loadFavoritesSuccess({favorites: response})),
          catchError((error) => of(MoviesActions.loadFavoritesFailure(error)))
        )
      )
    )
  )

  constructor(private actions$: Actions, private moviesService: MoviesService) {}
}
