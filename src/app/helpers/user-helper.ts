import { Location } from './location-helper';

export class User {
	public Alias : String;
	public FirstName : String;
	public LastName : String;
	public Age : Number;
	public BirthDate : Date;
	public Location : Location;
	public ProfileImage : String;
	public CoverImage : String;
  public Auth0Id: String;
  public _id : String;

  constructor(_id:String, Auth0Id:String, Alias:String, FirstName:String, LastName:String, Age:Number, BirthDate:Date, Location:Location, ProfileImage:String, CoverImage:String) {
    this._id = _id;
    this.Auth0Id = Auth0Id;
    this.Alias = Alias;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Age = Age;
    this.BirthDate = BirthDate;
    this.Location = Location;
    this.ProfileImage = ProfileImage;
    this.CoverImage = CoverImage;
  }
}

