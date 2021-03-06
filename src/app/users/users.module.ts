import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './../register/register.component';
import { LoginComponent } from './../login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { USERS_ROUTES } from './users.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MoneyHistoryComponent } from './money-history/money-history.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    MoneyHistoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(USERS_ROUTES),
    SharedModule
  ]
})
export class UsersModule { }
