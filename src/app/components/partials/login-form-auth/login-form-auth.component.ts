import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiBackService } from '../../../services/api-back.service';
import { AuthUserService } from '../../../services/auth-user.service';
import Swal from 'sweetalert2';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-form-auth',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form-auth.component.html',
  styleUrl: './login-form-auth.component.scss',
})
export class LoginFormAuthComponent {
  userForm!: FormGroup;
  constructor(
    private readonly apiBackService: ApiBackService,
    private readonly router: Router,
    private readonly authUserService: AuthUserService,
  ) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{8,}$'),
      ]),
    });
  }
  submit() {
    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;
      const user = { email: email, password: password };
      this.apiBackService.login(user).subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Connexion réussie !',
            text: `Vous êtes connecté(e) ${response.user.name} ${response.user.lastName}`,
          });
          this.authUserService.setUser(response.user);
          this.userForm.reset();
          this.router.navigate(['/dashboard/home']);
        },
        error: (err: Error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur à la connection',
            text: err.message,
          });
        },
      });
    }
    return;
  }
}
