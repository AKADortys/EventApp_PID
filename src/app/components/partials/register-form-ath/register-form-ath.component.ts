import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiBackService } from '../../../services/api-back.service';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserRegist, User } from '../../../models/users.interface';

@Component({
  selector: 'app-register-form-ath',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-form-ath.component.html',
  styleUrl: './register-form-ath.component.scss',
})
export class RegisterFormAthComponent {
  userForm!: FormGroup;

  constructor(private readonly apiBackService: ApiBackService) {
    this.userForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{8,}$'),
        ]),
        cPassword: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{8,}$'),
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?:(?:\\+33|0)[1-9])(?:[\\s.-]?\\d{2}){4}$'),
        ]),
        mail: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl('sportif', Validators.required),
      },
      { validators: this.passwordsMatch },
    );
  }

  passwordsMatch: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const cPassword = group.get('cPassword')?.value;

    return password === cPassword ? null : { passwordsMismatch: true };
  };

  submit() {
    if (this.userForm.valid) {
      const { name, lastName, password, phone, mail, role } =
        this.userForm.value;
      const user: UserRegist = { name, lastName, password, phone, mail, role };

      this.apiBackService.register(user).subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Inscription réussie !',
            text: 'Bienvenue, votre compte a été créé.',
          });
          this.userForm.reset();
        },
        error: (err: Error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur à l’inscription',
            text: err.message, // message personnalisé venant de `handleError`
          });
        },
      });
    } else {
      console.error('Form is not valid');
      console.log(this.userForm.errors);
      Object.keys(this.userForm.controls).forEach((key) => {
        console.log(key, this.userForm.get(key)?.errors);
      });
    }
  }
}
