import {Component} from '@angular/core';
import {Movie} from "../../models/movie.model";
import {MoviesService} from "../../services/movies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {selectMovies} from "../../store/movies/movies.selectors";
import {AppState} from "../../app.state";
import {loadMovies} from "../../store/movies/movies.actions";
import {Store} from "@ngrx/store";


@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms ease-in', style({opacity: 1})),
      ]),
    ]),
  ],
})
export class MoviesContainerComponent {
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;
  currentPage: number = 1;
  pageSize: number = 10;
  totalMovies: number = 0;
  searchQuery: string = '';
  originalMovies: Movie[] = [];
  availableGenres: string[] = ["Action", "Drama", "Comedy", "Thriller", "Adventure", "Documentary", "Horror", "Music", "Sci-Fi", "Family", "Mystery", "War", "Biography", "History"]; // List of available genres
  selectedGenres: { [genre: string]: boolean } = {}; // Selected genres for filtering

  constructor(private store: Store<AppState>, private movieService: MoviesService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page']) || 1;

      this.loadMovies();
      this.subscribeToMovies();
    });
  }

  // Inside your component class
  toggleGenreSelection(genre: string) {
    this.selectedGenres[genre] = !this.selectedGenres[genre];
    this.filterByGenres();
  }

  filterByGenres(): void {
    this.loadMovies(true);
  }

  searchMovieByName() {
    if (this.searchQuery.replace(/\s+/g, '').length > 0) {
      this.loadMovies(true);
    } else if(this.searchQuery.length === 0){
      this.loadMovies(false);
    }
  }

  loadMovies(resetPaging = false): void {
    const currentSearchQuery = this.searchQuery.length > 0 ? this.searchQuery : '';
    // Get an array of selected genres
    const selectedGenresArray = Object.keys(this.selectedGenres).filter((genre) => this.selectedGenres[genre]).join(",");
    if (resetPaging) {
      this.currentPage = 1;
    }

    this.store.dispatch(loadMovies({
      page: this.currentPage,
      pageSize: this.pageSize,
      search: currentSearchQuery,
      genres: selectedGenresArray
    }));
  }

  private subscribeToMovies() {
    this.store.select(selectMovies).subscribe((movies) => {
      if (movies && 'paginatedMovies' in movies) {
          this.router.navigate([], {queryParams: {page: this.currentPage}, queryParamsHandling: 'merge'});
          this.originalMovies = this.parseMoviesData(movies);
          this.movies = [...this.originalMovies]; // Create a copy for filtering
          this.totalMovies = this.extractTotalMovies(movies);
      }
    });
  }

  extractTotalMovies(movies: any) {
    return movies.total;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadMovies();
  }

  getNumberOfPages(): number {
    return Math.ceil(this.totalMovies / this.pageSize);
  }

  openModal(movie: any): void {
    this.selectedMovie = movie;
  }

  closeModal(): void {
    this.selectedMovie = null;
  }

  private parseMoviesData(data: any, isFromFavorite: boolean = false) {
    const dataToMap = isFromFavorite ? data : data.paginatedMovies;
    const currentPageMovies: Movie [] = dataToMap.map((item: { id: any; title: any; largeimage: any; released: any; rating: any; synopsis: any; runtime: any; genres:  string, isFavorite: boolean }) => ({
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
