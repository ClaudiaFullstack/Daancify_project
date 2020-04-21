import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserIdentity } from '../../models/user-identity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  urlImage = "../../../../../API/public/uploads/";
  @Input() user: UserIdentity;
  @Output() logout = new EventEmitter(false);

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  logOut() {
    this.logout.emit();
  }
}
