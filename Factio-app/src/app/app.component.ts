import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './api/_models';
import { AuthenticationService } from './api/_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {

  // in testing, si on arrive pas à récuperer la session actuel
  if(!localStorage.getItem('currentUser')){
    this.authenticationService.logout()
  }
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
    
}
