import { Component, OnInit } from '@angular/core';

import { VisibilityHelper } from '../../helpers/visibility-helper';
import { AuthService } from '../../services/auth/auth.service';
import { APIService } from '../../services/api/api.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public showMenu: boolean = false;
  public showSignIn: VisibilityHelper = new VisibilityHelper(false);

  constructor(public authService: AuthService, public apiService:APIService) { }

  ngOnInit() {
  }

}
