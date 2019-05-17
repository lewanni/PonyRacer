import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;
  userForm: FormGroup;
  passwordForm: FormGroup;

  registrationFailed: boolean;

  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { matchingError: true };
  }

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.loginCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.birthYearCtrl = this.formBuilder.control('', [Validators.required, Validators.min(1900),
    Validators.max(new Date().getFullYear())]);

    this.passwordForm = this.formBuilder.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    }, { validators: RegisterComponent.passwordMatch });

    this.userForm = this.formBuilder.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });

    this.registrationFailed = false;
  }

  ngOnInit() { }

  register(): void {
    this.userService.register(this.loginCtrl.value, this.passwordCtrl.value, this.birthYearCtrl.value).subscribe(res => {
      this.router.navigate(['/']);
    },
    error => {
      this.registrationFailed = true;
    });
  }

}
