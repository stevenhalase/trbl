import { User } from './user-helper';

export class Comment {
  public User: User;
  public Date: Date;
  public Content: String;
  public Replies: Array<Comment>;

  constructor(User:User, Date:Date, Content:String, Replies?:Array<Comment>) {
    this.User = User;
    this.Date = Date;
    this.Content = Content;
    this.Replies = Replies;
  }
}