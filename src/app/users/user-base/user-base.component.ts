import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  form!: FormGroup;

  genderOptions = [
    { title: 'Male', value: 'male' },
    { title: 'Female', value: 'female' },
  ];

  ageRange: number[] = [];
  constructor(injector: Injector) {
    console.log(injector);
    this.fb = injector.get(FormBuilder);
    this.router = injector.get(Router);
    this.valido = injector.get(ValidationService);
    this.userService = injector.get(UsersService);
    this.loadAgeRangeArray();
    this.buildForm();
  }
  loadAgeRangeArray() {
    for (let index = 18; index < 71; index++) {
      this.ageRange.push(index);
    }
  }
  private buildForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      family: [null, Validators.required],
      profession: [null, Validators.required],
      gender: [null, Validators.required],
      age: [null, Validators.required],
    });
  }

  goToUsersList() {
    this.router.navigate(['users']);
  }
}
