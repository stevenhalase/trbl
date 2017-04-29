import { Component, OnInit } from '@angular/core';

import { APIService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { LocationService } from '../../services/location/location.service';
import { User } from '../../helpers/user-helper';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  public peopleList:User[] = [];

  constructor(public apiService:APIService, public authService:AuthService, public locationService:LocationService) { 
    this.authService.userUpdateLocal$.subscribe(user => {
      if (user.Location && user.Location && user.Location.Latitude && user.Location.Longitude) {
        this.getPeople();
      }
    })

    setTimeout(() => {
      if (this.peopleList.length === 0) {
        this.getPeople();
      }
    },50)
  }

  ngOnInit() {
  }

  getPeople() {
    this.apiService.getPeople(this.apiService.user.Location.Latitude, this.apiService.user.Location.Longitude).subscribe(peopleList => {
      this.peopleList = peopleList;
    })
  }

  setFilter(distance:Number) {
    this.locationService.setFilter(distance);
  }
}
