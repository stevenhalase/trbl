import { Component, OnInit } from '@angular/core';

import { APIService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService:APIService, private authService:AuthService) { }

  ngOnInit() {
  }

}
