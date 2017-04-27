import { Data } from '@angular/router/router';
import { User } from './user-helper';
import { Location } from './location-helper';

export class FeedPost {
  public _id : String;
	public Date : Date;
	public User : User;
	public Location : Location;
	public Title : String;
	public Content : String;
	public Attachments : Array<any>;
	public Comments : Array<any>;
	public Likes : Array<any>;

  constructor(Date:Date, User:User, Location:Location, Title:String, Content:String, Attachments:Array<any>, Comments:Array<any>, Likes:Array<any>) {
    this.Date = Date;
    this.User = User;
    this.Location = Location;
    this.Title = Title;
    this.Content = Content;
    this.Attachments = Attachments;
    this.Comments = Comments;
    this.Likes = Likes;
  }
}