import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadFavorites} from "../../store/movies/movies.actions";
import {selectIsLoggedIn, selectLoggedInUserId} from "../../store/auth/auth.selectors";
import {selectFavorites, selectMovies} from "../../store/movies/movies.selectors";
import {Movie} from "../../models/movie.model";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(loadFavorites());
    this.subscribeToFavorites()
  }

  private subscribeToFavorites() {
    this.store.select(selectFavorites).subscribe((favorites) => {
      this.movies = this.parseMoviesData(favorites);
    });
  }

  openModal(movie: any): void {
    this.selectedMovie = movie;
  }

  closeModal(): void {
    this.selectedMovie = null;
  }

  private parseMoviesData(data: any) {
    const currentPageMovies: Movie [] = data.map((item: { id: any; title: any; largeimage: any; released: any; rating: any; synopsis: any; runtime: any; genres: string, isFavorite: boolean }) => ({
      Id: item.id,
      Title: item.title,
      ImageUrl: item.largeimage,
      Runtime: item.runtime,
      Year: item.released,
      Rating: item.rating !== '' ? item.rating : '?',
      Description: item.synopsis,
      Genres: item.genres.split(",").map(genre => genre.trim()),
      isFavorite: item.isFavorite ? item.isFavorite : false
    }))

    return currentPageMovies;
  }
}
