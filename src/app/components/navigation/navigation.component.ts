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

  private showMenu: boolean = false;
  private showSignIn: VisibilityHelper = new VisibilityHelper(false);

  constructor(private authService: AuthService, private apiService:APIService) { }

  ngOnInit() {
  }

}
