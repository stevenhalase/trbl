import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

}
