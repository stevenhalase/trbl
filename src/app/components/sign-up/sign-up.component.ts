import { Component, OnInit } from '@angular/core';

import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private emailAddress: string;
  private submitted: boolean = false;
  private notificationPosition: string = 'bottom';
  private notificationMessage: string = 'Thanks for signing up! We\'ve sent a validation email to the address you\'ve provided!';

  constructor() { }

  ngOnInit() {
  }

  isValidEmail() {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(this.emailAddress);
  }

  submit() {
    this.submitted = true;
  }

}
