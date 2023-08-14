import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {Store} from "@ngrx/store";
import {signup} from "../../store/auth/auth.actions";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router, private store:Store) {}

  onSubmit() {
    // Dispatch the signup action with the entered username and password
    if (this.password !== this.confirmPassword) {
      alert('password doesn\'t match');
      return;
    }
    this.store.dispatch(signup({ username: this.username, password: this.password }));
  }
}
