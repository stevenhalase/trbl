import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() position: string;
  @Input() message: string;

  public showNotification = true;

  constructor() { 
    setTimeout(() => {
      this.showNotification = false;
    },3000);
  }

  ngOnInit() {
  }

}
