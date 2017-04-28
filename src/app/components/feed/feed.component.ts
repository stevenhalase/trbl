import { Component, OnInit } from '@angular/core';

import { APIService } from '../../services/api/api.service';
import { FeedPost } from '../../helpers/feedPost-helper';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public feedPosts: Array<FeedPost>;

  constructor(public apiService:APIService) { 
    this.getFeedPosts();

    this.apiService.addedPost$.subscribe(() => {
      this.getFeedPosts();
    })
  }

  ngOnInit() {
  }

  getFeedPosts() {
    this.apiService.getFeedPosts().subscribe(returnFeedPosts => {
      this.feedPosts = returnFeedPosts;
      this.expandUserData();
    })
  }

  expandUserData() {
    for (let feedPost of this.feedPosts) {
      this.apiService.getUserById(feedPost.User.toString()).subscribe(returnUser => {
        feedPost.User = returnUser;
      })
    }
  }

}
