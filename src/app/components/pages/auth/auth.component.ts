import { Component } from '@angular/core';
import { LoginFormAuthComponent } from '../../partials/login-form-auth/login-form-auth.component';

@Component({
  selector: 'app-auth',
  imports: [LoginFormAuthComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
