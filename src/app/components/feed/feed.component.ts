import { Component, OnInit } from '@angular/core';

import { APIService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { LocationService } from '../../services/location/location.service';
import { FeedPost } from '../../helpers/feedPost-helper';
import { Comment } from '../../helpers/comment-helper';

declare var $;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public feedPosts: Array<FeedPost> = [];

  constructor(public apiService:APIService, public authService:AuthService, public locationService:LocationService) { 
    this.authService.userUpdateLocal$.subscribe(user => {
      if (user.Location && user.Location && user.Location.Latitude && user.Location.Longitude) {
        this.getFeedPosts();
      }
    })

    setTimeout(() => {
      if (this.feedPosts.length === 0) {
        this.getFeedPosts();
      }
    },50)

    this.apiService.addedPost$.subscribe(() => {
      this.getFeedPosts();
    })

    setTimeout(() => {
      $('.feedpost-comment-textarea').on('keydown', function(e){
        var that = $(this);
        if (that.scrollTop()) {
          if($(this).height() < 165) {
            $(this).height(function(i,h){
              return h + 20;
            });
          }
        }
      });
    }, 300);
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

  addComment(comment:Comment, feedPost:FeedPost) {
    feedPost.Comments.push(comment);
    this.apiService.updateFeedPost(feedPost._id, feedPost).subscribe(returnFeedPost => {
      feedPost = returnFeedPost;
    })
  }

  share() {

  }

  actionComplete(feedPost:FeedPost, searchTerm:String): Boolean {
    if (searchTerm === 'Likes') {
      for (let like of feedPost.Likes) {
        if (like.User._id === this.apiService.user._id) {
          return true;
        }
      }
      return false;
    } else if (searchTerm === 'Comments') {
      for (let comment of feedPost.Comments) {
        if (comment.User === this.apiService.user._id || comment.User._id === this.apiService.user._id) {
          return true;
        }
      }
    }
  }

  keyDownCheck(event, feedPost) {
    if(event.keyCode == 13) {
      let commentText = (<HTMLInputElement>document.getElementById(feedPost._id + '-feedpost-comment')).value;
      (<HTMLInputElement>document.getElementById(feedPost._id + '-feedpost-comment')).value = '';
      let comment = new Comment(this.apiService.user, new Date(), commentText);
      this.addComment(comment, feedPost);
    }
  }

  expandUserData() {
    for (let feedPost of this.feedPosts) {
      this.apiService.getUserById(feedPost.User.toString()).subscribe(returnUser => {
        feedPost.User = returnUser;
        for (let comment of feedPost.Comments) {
          this.apiService.getUserById(comment.User.toString()).subscribe(returnUser => {
            comment.User = returnUser;
          })
        }
      })
    }
  }

}
