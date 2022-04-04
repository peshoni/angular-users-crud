import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';
import { User } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user-base',
  template: 'NO UI',
})
export class UserBaseComponent {
  private fb!: FormBuilder;
  private router!: Router;
  public valido: ValidationService;
  form!: FormGroup;

  genderOptions = [
    { title: 'Gender', value: 0 },
    { title: 'Male', value: 1 },
    { title: 'Female', value: 1 },
  ];
  constructor(injector: Injector) {
    console.log(injector);
    this.fb = injector.get(FormBuilder);
    this.router = injector.get(Router);
    this.valido = injector.get(ValidationService);
    this.buildForm();
  }
  private buildForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      family: [null, Validators.required],
      profession: [null, Validators.required],
      sex: [null, Validators.required],
      age: [null, Validators.required],
    });
  }

  goToUsersList() {
    this.router.navigate(['users']);
  }

  mutateData(user: User) {
    console.log(user);
  }
}
