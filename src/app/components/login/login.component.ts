import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {Store} from "@ngrx/store";
import {login} from "../../store/auth/auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private store:Store) {}

  login() {
    // Dispatch the signup action with the entered username and password
    this.store.dispatch(login({ username: this.username, password: this.password }));
  }
}
