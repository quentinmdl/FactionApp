import { Component } from '@angular/core';


@Component({
  selector: 'app-logged-in-layout',
  template: '<app-nav-menu></app-nav-menu><div class="container content"><router-outlet></router-outlet></div>'
})
export class AuthenticatedComponent  {  
}
