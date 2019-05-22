import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './../register/register.component';
import { LoginComponent } from './../login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { USERS_ROUTES } from './users.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(USERS_ROUTES)
  ]
})
export class UsersModule { }
