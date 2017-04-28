import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Subject }    from 'rxjs/Subject';
import { Router } from '@angular/router';

declare var Auth0Lock;

import { User } from '../../helpers/user-helper';

import { AuthFile } from '../../../../auth';

@Injectable()
export class AuthService {

  public lock = new Auth0Lock(AuthFile.Auth0Key, AuthFile.Auth0Url, { });
  public localUser:any;
  
  public userLoginSource = new Subject<any>();
  public userLogoutSource = new Subject<any>();
  public userUpdateLocalSource = new Subject<any>();

  userLogin$ = this.userLoginSource.asObservable();
  userLogout$ = this.userLogoutSource.asObservable();
  userUpdateLocal$ = this.userUpdateLocalSource.asObservable();

  constructor(public router: Router) {
    this.lock.on("authenticated", (authResult) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        let localUser = JSON.parse(localStorage.getItem('profile'));
        this.userLoginSource.next(localUser)
      });
    });


    this.localUser = JSON.parse(localStorage.getItem('profile'));
    setTimeout(() => {
      this.userUpdateLocalSource.next(this.localUser);
    },50);
   }

   public updateUser() {
    console.log('yes')
   }

   public login() {
      this.lock.show();
    }

    public authenticated() {
      return tokenNotExpired('id_token');
    }

    public logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      this.userLogoutSource.next();
      this.router.navigate(['/home']);
    }

}
