import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../../helpers/user-helper';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class APIService {

  private apiUrl = 'http://localhost:8080';
  public user:User = new User('','','','',0,new Date(),{},'','')

  constructor(private http: Http, private authService:AuthService) {
    this.authService.userLogin$.subscribe(localUser => {
      this.user = new User(localUser.user_id, localUser.name, '', '', 0, new Date(), {}, localUser.picture, '');
      this.getUser(localUser.user_id).subscribe(returnUser => {
        if (!returnUser._id) {
          this.createUser(this.user).subscribe(savedUser => {
            this.user = savedUser;
          })
        } else {
          this.user = returnUser;
        }
      })
    });
    this.authService.userLogout$.subscribe(() => {
      this.user = new User('','','','',0,new Date(),{},'','')
    });
  }

  getUser(userID:string): Observable<User> {
    return this.http.get(this.apiUrl + '/users/' + userID)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  createUser(user:User): Observable<User> {
    return this.http.post(this.apiUrl + '/users/', user)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

