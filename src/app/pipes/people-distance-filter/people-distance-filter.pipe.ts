import { Pipe, PipeTransform } from '@angular/core';

import { APIService } from '../../services/api/api.service';
import { User } from '../../helpers/user-helper';

@Pipe({
  name: 'peopleDistanceFilter'
})
export class PeopleDistanceFilterPipe implements PipeTransform {

  constructor(public apiService:APIService) {

  }

  transform(people: User[], distance: Number): any {
      if (!people || !distance) {
          return people;
      }
      // filter items array, items which match and return true will be kept, false will be filtered out
      return people.filter(person => this.getDistanceFromLatLonInKm(person.Location.Latitude, person.Location.Longitude, 
        this.apiService.user.Location.Latitude, this.apiService.user.Location.Longitude) * 0.621371 <= distance);
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2-lon1); 
    let a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}
