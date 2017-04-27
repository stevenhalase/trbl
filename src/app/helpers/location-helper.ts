export class Location {
  public Latitude: Number;
  public Longitude: Number;
  public City: String;
  public State: String;

  constructor(Latitude:Number, Longitude:Number, City:String = '', State:String = '') {
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this.City = City;
    this.State = State;
  }
}