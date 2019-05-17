import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  navbarCollapsed: boolean;
  user: UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService: UserService) {
    this.navbarCollapsed = true;
    this.user = null;
  }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

}
