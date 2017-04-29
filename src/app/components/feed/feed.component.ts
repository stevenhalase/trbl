import { Component, OnInit } from '@angular/core';

import { APIService } from '../../services/api/api.service';
import { LocationService } from '../../services/location/location.service';
import { FeedPost } from '../../helpers/feedPost-helper';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public feedPosts: Array<FeedPost> = [];

  constructor(public apiService:APIService, public locationService:LocationService) { 
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

  addLike(feedPost:FeedPost) {
    feedPost.Likes.push({
      User: this.apiService.user,
      Date: new Date()
    })
    this.apiService.updateFeedPost(feedPost._id, feedPost).subscribe(returnFeedPost => {
      feedPost = returnFeedPost;
    })
  }

  addComment() {

  }

  share() {

  }

  actionComplete(feedPost:FeedPost): Boolean {
    for (let like of feedPost.Likes) {
      if (like.User._id === this.apiService.user._id) {
        return true;
      }
    }
    return false;
  }

  expandUserData() {
    for (let feedPost of this.feedPosts) {
      this.apiService.getUserById(feedPost.User.toString()).subscribe(returnUser => {
        feedPost.User = returnUser;
      })
    }
  }

}
