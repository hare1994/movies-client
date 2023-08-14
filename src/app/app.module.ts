import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import {MoviesContainerComponent} from "./components/movies-container/movies-container.component";
import {MovieBoxComponent} from "./components/movies-container/movie-box/movie-box.component";
import {MoviesService} from "./services/movies.service";
import {AppRoutingModule} from "./app-routing.module";
import {MovieModalComponent} from './components/movie-modal/movie-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DescriptionFormatPipe} from "./pipes/ description-format.pipe";
import {FooterComponent} from "./components/footer/footer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import {moviesReducer} from './store/movies/movies.reducer';
import {MoviesEffects} from "./store/movies/movies.effects";
import {EffectsModule} from "@ngrx/effects";
import { SignupComponent } from './components/signup/signup.component';
import {authReducer} from "./store/auth/auth.reducer";
import {AuthEffects} from "./store/auth/auth.effects";
import { LoginComponent } from './components/login/login.component';
import {FavoritesComponent} from "./components/favorites/favorites.component";
import {AuthService} from "./services/auth.service";


@NgModule({
  declarations: [AppComponent, HeaderComponent, MoviesContainerComponent, MovieBoxComponent, MovieModalComponent, DescriptionFormatPipe, FooterComponent, SignupComponent, LoginComponent, FavoritesComponent],
  imports: [ReactiveFormsModule , BrowserModule, HttpClientModule, AppRoutingModule, MatDialogModule, BrowserAnimationsModule, FormsModule,
    StoreModule.forRoot({
      auth: authReducer,
      movies: moviesReducer
    }),
    EffectsModule.forRoot([AuthEffects, MoviesEffects]), // Add your other effects here
  ],
  providers: [MoviesService,  {
    provide: APP_INITIALIZER,
    useFactory: (authService: AuthService) => () => authService.checkUserIdOnInit(),
    multi: true,
    deps: [AuthService],
  },],
  bootstrap: [AppComponent],
})
export class AppModule {
}
