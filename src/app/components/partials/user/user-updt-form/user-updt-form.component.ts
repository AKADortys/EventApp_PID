import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ApiBackService } from '../../../../services/api-back.service';
import Swal from 'sweetalert2';
import { User, UserRegist } from '../../../../models/users.interface';
import { AuthUserService } from '../../../../services/auth-user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-updt-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-updt-form.component.html',
  styleUrl: './user-updt-form.component.scss',
})
export class UserUpdtFormComponent {
  form!: FormGroup;
  user: User | null;
  constructor(
    private readonly apiBack: ApiBackService,
    private readonly authService: AuthUserService,
    private readonly router: Router,
  ) {
    this.user = this.authService.getUser();
    this.form = new FormGroup(
      {
        name: new FormControl(this.user?.name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastName: new FormControl(this.user?.lastName, [
          Validators.required,
          Validators.minLength(3),
        ]),
        password: new FormControl('', [
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{8,}$'),
        ]),
        cPassword: new FormControl('', [
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{8,}$'),
        ]),
        phone: new FormControl(this.user?.phone, [
          Validators.required,
          Validators.pattern('^(?:(?:\\+33|0)[1-9])(?:[\\s.-]?\\d{2}){4}$'),
        ]),
        mail: new FormControl(this.user?.mail, [
          Validators.required,
          Validators.email,
        ]),
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
    if (this.form.valid) {
      const { name, lastName, password, cPassword, phone, mail } =
        this.form.value;
      const user: any = { name, lastName, phone, mail };
      if (password) user.password = password;

      this.apiBack.updateUser(this.user?._id, user).subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Modification réussie !',
            text: 'Votre compte a été modifié.',
          });
          this.authService.setUser(response.user);
          this.router.navigate(['/dashboard/profile']);
        },
        error: (err: Error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur à la modification',
            text: err.message,
          });
        },
      });
    } else {
      console.error('Form is not valid');
      console.log(this.form.errors);
      Object.keys(this.form.controls).forEach((key) => {
        console.log(key, this.form.get(key)?.errors);
      });
    }
  }
}
