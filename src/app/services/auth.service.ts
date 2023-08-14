import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {loginSuccess} from "../store/auth/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private store: Store) {
  }

  login(username: string, password: string): Observable<any> {
    const loginData = {username, password};
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  signup(username: string, password: string): Observable<any> {
    const signupData = {username, password};
    return this.http.post(`${this.baseUrl}/signup`, signupData);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  checkUserIdOnInit(): Promise<void> {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      return this.http.post(`${this.baseUrl}/checkConnectedUser`, {storedUserId}).toPromise()
        .then((response: any) => {
          if (!response.isValid) {
            // Handle logout logic here
            localStorage.removeItem('userId');
          } else {
            this.store.dispatch(loginSuccess({user: response.user}));
          }
        })
        .catch(error => {
          console.error('Error checking user ID:', error);
        });
    }

    return Promise.resolve();
  }
}
