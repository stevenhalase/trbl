import { Component, OnInit } from '@angular/core';

import { APIService } from '../../services/api/api.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  constructor(private apiService:APIService,) { }

  ngOnInit() {
  }

}
