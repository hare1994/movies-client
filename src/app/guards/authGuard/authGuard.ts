import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {selectIsLoggedIn} from "../../store/auth/auth.selectors";
import {map} from "rxjs/operators"; // Adjust the path

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectIsLoggedIn).pipe(
      map(loggedIn => {
        if (loggedIn) {
          return true; // User is logged in, allow access
        } else {
          // User is not logged in, redirect to login page with return URL
          return this.router.createUrlTree(['/movies'], {  });
        }
      })
    );
  }
}
