import { Component } from '@angular/core';
import { UserUpdtFormComponent } from '../../partials/user/user-updt-form/user-updt-form.component';

@Component({
  selector: 'app-params-user',
  imports: [UserUpdtFormComponent],
  templateUrl: './params-user.component.html',
  styleUrl: './params-user.component.scss',
})
export class ParamsUserComponent {}
