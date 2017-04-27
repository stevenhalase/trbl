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

  private postSelected:Boolean = false;
  private location:Location = new Location(0,0,'','');
  private feedPost:FeedPost = new FeedPost(new Date(), this.apiService.user, new Location(0,0), '', '', [], [], []);

  constructor(private apiService:APIService, private locationService:LocationService) {
    this.apiService.userUpdate$.subscribe(updatedUser => {
      this.feedPost.User = updatedUser;
    })
  }

  ngOnInit() {
  }

  submitPost() {
    this.feedPost.Date = new Date();
    this.locationService.getLocation().then(location => {
        this.locationService.getReverseGeocoding(location).subscribe(reverseGeocode => {
        this.feedPost.Location.City = reverseGeocode.results[0].address_components.city;
        this.feedPost.Location.State = reverseGeocode.results[0].address_components.state;

        this.apiService.createFeedPost(this.feedPost).subscribe(returnFeedPost => {
          this.feedPost = new FeedPost(new Date(), this.apiService.user, new Location(0,0), '', '', [], [], []);
        });
      });
    });
  }

}
