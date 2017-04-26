import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { VisibilityHelper } from '../../helpers/visibility-helper';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Input() showSignIn: VisibilityHelper = new VisibilityHelper(false);
  @Output() showSignInChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  hideSignIn() {
    this.showSignIn.show = false;
    this.showSignInChange.emit(false)
  }

}
