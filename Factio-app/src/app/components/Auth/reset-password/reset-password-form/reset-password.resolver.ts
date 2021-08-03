import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { User } from "src/app/api/_models";
import { UserService } from "src/app/api/_services";

@Injectable()
export class ResetPasswordResolver implements Resolve<any> {

  constructor(public userService: UserService) { }
  user: User;

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let token = route.paramMap.get('token');
      this.userService.getUserByToken(token).subscribe(user => {
        debugger;
        this.user = user;
        resolve(user)
      })
    })
  }
}
