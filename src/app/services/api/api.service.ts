import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';

import { User } from '../../helpers/user-helper';
import { Location } from '../../helpers/location-helper';
import { FeedPost } from '../../helpers/feedPost-helper';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class APIService {

  public apiUrl = 'http://localhost:8080';
  public user:User = new User('', '','','','',0,new Date(), new Location(0,0),'','')

  public userUpdateSource = new Subject<User>();
  userUpdate$ = this.userUpdateSource.asObservable();

  public addedPostSource = new Subject<any>();
  addedPost$ = this.addedPostSource.asObservable();

  constructor(public http: Http, public authService:AuthService) {
    this.authService.userUpdateLocal$.subscribe(user => {
      this.user = user;
    })

    this.authService.userLogin$.subscribe(localUser => {
      this.user = new User('', localUser.user_id, localUser.name, '', '', 0, new Date(), new Location(0,0), localUser.picture, '');
      this.getUser(localUser.user_id).subscribe(returnUser => {
        if (!returnUser._id) {
          this.createUser(this.user).subscribe(savedUser => {
            this.user = savedUser;
            localStorage.setItem('profile', JSON.stringify(this.user));
            this.userUpdateSource.next(this.user);
          })
        } else {
          this.user = returnUser;
          localStorage.setItem('profile', JSON.stringify(this.user));
          this.userUpdateSource.next(this.user);
        }
      })
    });
    this.authService.userLogout$.subscribe(() => {
      this.user = new User('', '','','','',0,new Date(), new Location(0,0),'','')
    });
  }

  getUser(userID:String): Observable<User> {
    return this.http.get(this.apiUrl + '/users/' + userID)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getUserById(userID:String): Observable<User> {
    return this.http.get(this.apiUrl + '/users/id/' + userID)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  createUser(user:User): Observable<User> {
    return this.http.post(this.apiUrl + '/users/', user)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  updateUser(userID:String, user:User): Observable<User> {
    return this.http.put(this.apiUrl + '/users/' + userID, user)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getFeedPosts(): Observable<FeedPost[]> {
    return this.http.get(this.apiUrl + '/feedposts')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  createFeedPost(feedPost:FeedPost): Observable<FeedPost> {
    return this.http.post(this.apiUrl + '/feedposts/', feedPost)
                    .map(this.extractFeedData, this)
                    .catch(this.handleError)
  }

  public extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  public extractFeedData(res: Response) {
    this.addedPostSource.next();
    let body = res.json();
    return body || { };
  }


  public handleError (error: Response | any) {
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

