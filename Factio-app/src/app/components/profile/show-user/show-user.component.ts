import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Observable, of } from 'rxjs';

import { User } from 'src/app/api/_models';
import { UserService, LoadingService } from 'src/app/api/_services';

import { EditUserComponent } from '../edit-user/edit-user.component';
import { EditPasswordComponent } from '../edit-password/edit-password.component';

import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  currentUser: User;
  users: User[];
  searchText: string = '';
  filteredUsers$: Observable<User[]>;
  formGroup: FormGroup;
  activatedRoute: ActivatedRoute;

  constructor(
    private router: Router, 
    private userService: UserService, 
    private dialog: MatDialog,
    public loader: LoadingService
  ) { }


  ngOnInit() {
    let token = window.localStorage.getItem('UserToken').replace(/['"]+/g, '');
    if(!token) {
      this.router.navigate(['login']);
      return;
    }
    else {
      this.userService.getUserByToken(token).subscribe(user => {
        this.currentUser = user;
      })
    }
  }

  editUser(user: User): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id.toString());
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(EditUserComponent,{
      width: '640px',disableClose: true 
    });
  };

  editPasswordUser(user: User): void {
    window.localStorage.removeItem("editPasswordUserId");
    window.localStorage.setItem("editPasswordUserId", user.id.toString());
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(EditPasswordComponent,{
      width: '640px',disableClose: true 
    });
  }

}
