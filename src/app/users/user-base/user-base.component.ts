import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/mesages.service';
import { ValidationService } from 'src/app/services/validation.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-base',
  template: 'NO UI',
})
export class UserBaseComponent {
  private fb!: FormBuilder;
  private router!: Router;
  public valido: ValidationService;
  protected userService: UsersService;
  protected snackBar: MatSnackBar;
  private messagesService: MessagesService;
  form!: FormGroup;

  genderOptions = [
    { title: 'Male', value: 'male' },
    { title: 'Female', value: 'female' },
  ];
  ageRange: number[] = [];

  constructor(injector: Injector) {
    this.fb = injector.get(FormBuilder);
    this.router = injector.get(Router);
    this.valido = injector.get(ValidationService);
    this.userService = injector.get(UsersService);
    this.snackBar = injector.get(MatSnackBar);
    this.messagesService = injector.get(MessagesService);
    this.loadAgeRangeArray();
    this.buildForm();
  }
  loadAgeRangeArray() {
    for (let index = 18; index <= 70; index++) {
      this.ageRange.push(index);
    }
  }
  private buildForm() {
    this.form = this.fb.group({
      name: [null, this.valido.getValidatorFnForNames()],
      family: [null, this.valido.getValidatorFnForNames()],
      profession: [null, this.valido.getValidatorFnForProffesion()],
      gender: [null, [Validators.required, Validators.pattern('[female]+')]],
      age: [
        null,
        [Validators.required, Validators.min(18), Validators.max(70)],
      ],
    });
  }
  notifyUser(
    type: string,
    message: string,
    duration = null
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.messagesService.notifyUser(type, message, duration);
  }

  goToUsersList() {
    this.router.navigate(['users']);
  }
}
