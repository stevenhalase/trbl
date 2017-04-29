import { Component, OnInit } from '@angular/core';

import { APIService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { LocationService } from '../../services/location/location.service';

@Component({
  selector: 'app-static-map',
  templateUrl: './static-map.component.html',
  styleUrls: ['./static-map.component.css']
})
export class StaticMapComponent implements OnInit {

  public gmapUrl:String;

  constructor(public apiService:APIService, public authService:AuthService, public locationService:LocationService) {
    this.authService.userUpdateLocal$.subscribe(user => {
      if (user.Location && user.Location && user.Location.Latitude && user.Location.Longitude) {
        this.gmapUrl = this.gmapCircle(user.Location.Latitude, user.Location.Longitude, this.locationService.filter);
      }
    })

    this.locationService.filterChangedSource$.subscribe(() => {
      if (this.apiService.user.Location && this.apiService.user.Location && this.apiService.user.Location.Latitude && this.apiService.user.Location.Longitude) {
        this.gmapUrl = this.gmapCircle(this.apiService.user.Location.Latitude, this.apiService.user.Location.Longitude, this.locationService.filter);
      }
    })

    setTimeout(() => {
      this.gmapUrl = this.gmapCircle(this.apiService.user.Location.Latitude, this.apiService.user.Location.Longitude, this.locationService.filter);
    },50)
  }

  ngOnInit() {
  }

  gmapCircle(lat,lng,rad,detail=8){
    let uri = 'https://maps.googleapis.com/maps/api/staticmap?';
    let staticMapSrc = 'center=' + lat + ',' + lng;
    staticMapSrc += '&size=800x400';
    staticMapSrc += '&path=weight:1';

    let r = 6371;

    let pi = Math.PI;

    let _lat  = (lat * pi) / 180;
    let _lng  = (lng * pi) / 180;
    let d    = (rad*1.60934) / r;

    let i = 0;

    for(i = 0; i <= 360; i+=detail) {
      let brng = i * pi / 180;

      let pLat = Math.asin(Math.sin(_lat) * Math.cos(d) + Math.cos(_lat) * Math.sin(d) * Math.cos(brng));
      let pLng = ((_lng + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(_lat), Math.cos(d) - Math.sin(_lat) * Math.sin(pLat))) * 180) / pi;
      pLat = (pLat * 180) / pi;

      staticMapSrc += "|" + pLat + "," + pLng;
    }
    
    return uri + encodeURI(staticMapSrc) + '&key=AIzaSyD-CCizXHmP0HoRJFoU7leCsW3yzyGFdLc&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e';
  }

}
