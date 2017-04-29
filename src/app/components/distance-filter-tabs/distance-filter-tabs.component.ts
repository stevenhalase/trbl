import { Component, OnInit } from '@angular/core';

import { LocationService } from '../../services/location/location.service';

@Component({
  selector: 'app-distance-filter-tabs',
  templateUrl: './distance-filter-tabs.component.html',
  styleUrls: ['./distance-filter-tabs.component.css']
})
export class DistanceFilterTabsComponent implements OnInit {

  constructor(public locationService:LocationService) { }

  ngOnInit() {
  }

  setFilter(distance:Number) {
    this.locationService.setFilter(distance);
  }

}
