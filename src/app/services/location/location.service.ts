import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';

import { Location } from '../../helpers/location-helper';

import { AuthFile } from '../../../../auth';

@Injectable()
export class LocationService {

  private geoApiUrl = 'https://api.geocod.io/v1/reverse';
  private geoKey = AuthFile.GeoKey;

  constructor(private http: Http) { }

  getReverseGeocoding(location:Location): Observable<any> {
    return this.http.get(this.geoApiUrl + '?q=' + location.Latitude + ',' + location.Longitude + '&api_key=' + this.geoKey)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getLocation(): Promise<any>{
    let promise = new Promise((resolve, reject) => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            resolve(new Location(position.coords.latitude, position.coords.longitude));
          });
      } else {
          reject();
      }
    });
    return promise;
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
