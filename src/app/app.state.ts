// app.state.ts

import { Movie } from './models/movie.model';
import {AuthState} from "./store/auth/auth.reducer";
import {MoviesState} from "./store/movies/movies.reducer"; // Import your custom movie model if you have one

export interface AppState {
  auth: AuthState;
  movies: MoviesState;
  // Other state properties go here
}
