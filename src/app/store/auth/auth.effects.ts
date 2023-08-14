import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service'; // Create this service to handle API calls
import * as AuthActions from './auth.actions';
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action.username, action.password).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(error => [AuthActions.loginFailure({ error })])
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((value) => {
        localStorage.setItem('userId', value.user.userId);
        this.router.navigate(['/movies']); // Navigate to the movies page on successful login
      })
    ), {dispatch: false}
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap((errorObject) => {
        alert(errorObject.error.error.message);
      })
    ), {dispatch: false}
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(action =>
        this.authService.signup(action.username, action.password).pipe(
          map(user => AuthActions.signupSuccess({user})),
          catchError(error => [AuthActions.signupFailure({error})])
        )
      )
    )
  );

  signupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupSuccess),
      tap((value) => {
        // After receiving the user ID from the server
        localStorage.setItem('userId', value.user.userId);
        this.router.navigate(['/movies']); // Navigate to the movies page on successful login
        alert('Signed up successfully');
      })
    ), {dispatch: false}
  );

  signupFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupFailure),
      tap((errorObject) => {
        alert(errorObject.error.error.message);
      })
    ), {dispatch: false}
  );

  // Logout effect could just dispatch the logout success action
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(action =>
        this.authService.logout().pipe(
          map(user => AuthActions.logoutSuccess()),
          catchError(error => [AuthActions.logoutFailure({error})])
        )
      )
    )
  );

  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutSuccess),
      tap(() => {
        alert('Logged out successfully');
        this.router.navigate(['/movies']); // Navigate to the movies page on successful login
      })
    ), {dispatch: false}
  );
}
