import { Component, OnInit } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { APIService } from '../../services/api/api.service';
import { LocationService } from '../../services/location/location.service';
import { FeedPost } from '../../helpers/feedPost-helper';
import { Location } from '../../helpers/location-helper';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public submittingPost:Boolean = false;
  public leaveTimer:any;
  public postSelected:Boolean = false;
  public location:Location = new Location(0,0,'','');
  public feedPost:FeedPost = new FeedPost(new Date(), this.apiService.user, new Location(0,0), '', '', [], [], []);

  constructor(public apiService:APIService, public locationService:LocationService) {
    this.apiService.userUpdate$.subscribe(updatedUser => {
      this.feedPost.User = updatedUser;
      this.feedPost.Location.Latitude = this.feedPost.User.Location.Latitude;
      this.feedPost.Location.Longitude = this.feedPost.User.Location.Longitude;
    })
  }

  ngOnInit() {
  }

  submitPost() {
    this.submittingPost = true;
    this.feedPost.Date = new Date();
    this.locationService.getLocation().then(location => {
        this.locationService.getReverseGeocoding(location).subscribe(reverseGeocode => {
        this.feedPost.Location.City = reverseGeocode.results[0].address_components.city;
        this.feedPost.Location.State = reverseGeocode.results[0].address_components.state;

        this.apiService.createFeedPost(this.feedPost).subscribe(returnFeedPost => {
          this.feedPost = new FeedPost(new Date(), this.apiService.user, new Location(0,0), '', '', [], [], []);
          this.submittingPost = false;
        });
      });
    });
  }

  fireMouseEnter() {
    clearTimeout(this.leaveTimer);
    this.postSelected = true;
  }

  fireMouseLeave() {
    this.leaveTimer = setTimeout(() => {
      this.postSelected = false
    },500);
  }

}
