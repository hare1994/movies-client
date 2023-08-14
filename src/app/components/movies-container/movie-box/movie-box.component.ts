import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Movie} from "../../../models/movie.model";
import {selectIsLoggedIn, selectLoggedInUserId} from "../../../store/auth/auth.selectors";
import {Store} from "@ngrx/store";
import {favoriteMovie, unfavoriteMovie} from "../../../store/movies/movies.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.scss']
})
export class MovieBoxComponent {
  @Input() movie: Movie = {ImageUrl: '', Description: '', Id: '-1', Rating: -1, Runtime: '', Title: '', Year: -1, Genres: [], isFavorite: false};
  @Output() readMore: EventEmitter<any> = new EventEmitter<any>();

  loggedInUserId: string = '-1';

  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  loggedinUserId$ = this.store.select(selectLoggedInUserId).subscribe(value => {
    this.loggedInUserId = value;
  });

  constructor(private store: Store, private router: Router) { }

  favoriteMovie(){
    this.store.dispatch(favoriteMovie({
      userId: this.loggedInUserId,
      movieId: this.movie.Id
    }))
  }

  unFavoriteMovie() {
    this.store.dispatch(unfavoriteMovie({
      userId: this.loggedInUserId,
      movieId: this.movie.Id
    }))
  }

  onReadMore(): void {
    this.readMore.emit(this.movie);
  }
}
