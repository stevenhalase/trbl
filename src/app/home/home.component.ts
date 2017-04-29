import { Component, OnInit } from '@angular/core';

import { APIService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public peopleListOpen: Boolean;

  constructor(public apiService:APIService, public authService:AuthService) { }

  ngOnInit() {
  }


}
