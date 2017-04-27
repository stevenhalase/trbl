import { Component, OnInit } from '@angular/core';

import { APIService } from '../../services/api/api.service';
import { LocationService } from '../../services/location/location.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  public gettingLocation:Boolean = false;

  constructor(private apiService:APIService, private locationService:LocationService) {
  }

  ngOnInit() {
  }

  getLocation() {
    this.gettingLocation = true;
    this.locationService.getLocation().then(location => {
      this.locationService.getReverseGeocoding(location).subscribe(reverseGeocode => {
        location.City = reverseGeocode.results[0].address_components.city;
        location.State = reverseGeocode.results[0].address_components.state;
        this.apiService.user.Location = location;
        this.gettingLocation = false;
      });
    });
  }

  saveProfile() {
    this.apiService.updateUser(this.apiService.user.Auth0Id, this.apiService.user).subscribe(returnUser => {
      this.apiService.user = returnUser;
    })
  }

}
