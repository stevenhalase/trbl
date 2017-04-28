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
  public savingProfile:Boolean = false;
  constructor(public apiService:APIService, public locationService:LocationService) {
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
    this.savingProfile = true;
    this.apiService.updateUser(this.apiService.user.Auth0Id, this.apiService.user).subscribe(returnUser => {
      this.apiService.user = returnUser;
      localStorage.setItem('profile', JSON.stringify(this.apiService.user));
      this.savingProfile = false;
    })
  }

  parseDate() {
    console.log('yep')
  }

}
