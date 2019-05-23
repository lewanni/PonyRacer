import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserService } from '../user.service';
import { of, concat, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap, catchError, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  navbarCollapsed: boolean;

  userEvents: Observable<UserModel>;


  constructor(private userService: UserService, private router: Router) {
    this.navbarCollapsed = true;
  }

  ngOnInit() {
    this.userEvents = this.userService.userEvents
      .pipe(
        switchMap(user => user ? concat(of(user),
          this.userService.scoreUpdates(user.id).pipe(catchError(() => EMPTY))) :
          of(null)),
        shareReplay());
  }

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event): void {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
