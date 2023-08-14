import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoviesContainerComponent} from "./components/movies-container/movies-container.component";
import {SignupComponent} from "./components/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {FavoritesComponent} from "./components/favorites/favorites.component";
import {AuthGuard} from "./guards/authGuard/authGuard";


// Define your routes
const routes: Routes = [
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {path: 'movies', component: MoviesContainerComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
