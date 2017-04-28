import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { APIService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public authService:AuthService, public apiService:APIService, public router:Router) { 
    if (!authService.authenticated()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

}
