import { Component } from '@angular/core';
import { RegisterFormAthComponent } from '../../partials/register-form-ath/register-form-ath.component';
import { LoginFormAuthComponent } from '../../partials/login-form-auth/login-form-auth.component';

@Component({
  selector: 'app-auth',
  imports: [RegisterFormAthComponent, LoginFormAuthComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
