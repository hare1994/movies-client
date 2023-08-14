// movies.service.ts

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MoviesActions from '../store/movies/movies.actions';
import { AppState } from '../app.state';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient, private store: Store<AppState>) {}

    getMovies(page: number, pageSize: number, search: string = '', genres: string = '') {
      return this.http.get<any>(`${this.baseUrl}/movies`, { params: { page, pageSize, search, genres } });
    }

    favoriteMovie(userId: string, movieId: string) {
      return this.http.post<any>(`${this.baseUrl}/favoriteMovie`, { userId, movieId });
    }

    unfavoriteMovie(userId: string, movieId: string) {
      return this.http.post<any>(`${this.baseUrl}/unfavoriteMovie`, { userId, movieId });
    }

    loadFavorites() {
      return this.http.get<any>(`${this.baseUrl}/favorites`);
    }

  // Other methods for updating or deleting movies could be added here
}
