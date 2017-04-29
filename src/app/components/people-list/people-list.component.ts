import { Component, OnInit } from '@angular/core';

import { APIService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../helpers/user-helper';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  public peopleList:User[];
  public filter:Number = 10;

  constructor(public apiService:APIService, public authService:AuthService) { 
    this.authService.userUpdateLocal$.subscribe(user => {
      if (user.Location && user.Location && user.Location.Latitude && user.Location.Longitude) {
        this.getPeople();
      }
    })

    setTimeout(() => {
      if (!this.peopleList) {
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
}
