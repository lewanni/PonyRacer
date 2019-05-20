import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RacesComponent } from './races/races.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BetComponent } from './bet/bet.component';
import { LiveComponent } from './live/live.component';
import { LoggedInGuard } from './logged-in.guard';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'races', canActivate: [LoggedInGuard],
    children: [
      { path: '', component: RacesComponent },
      { path: ':raceId', component:  BetComponent },
      { path: ':raceId/live', component:  LiveComponent }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];
