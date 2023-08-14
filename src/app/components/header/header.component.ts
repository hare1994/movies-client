import {Component} from '@angular/core';
import {selectIsLoggedIn, selectLoggedInUsername} from "../../store/auth/auth.selectors";
import { logout } from '../../store/auth/auth.actions';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  loggedInUsername$ = this.store.select(selectLoggedInUsername);

  constructor(private store: Store) { }

  ngOnInit(): void { }

  logout() {
    this.store.dispatch(logout());
  }
}
