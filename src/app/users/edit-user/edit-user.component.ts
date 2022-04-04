import { Component, Injector, OnInit } from '@angular/core';
import { BundleService } from 'src/app/services/bundle.service';
import { UserBaseComponent } from '../user-base/user-base.component';
export interface User {
  name: string;
  family: string;
  profession: string;
  sex: number;
  age: number;
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent extends UserBaseComponent implements OnInit {
  constructor(injector: Injector, private bundle: BundleService) {
    super(injector);
  }

  ngOnInit(): void {
    const user: User = {
      name: 'Ivan',
      family: 'Ivanov',
      age: 25,
      sex: 1,
      profession: 'driver',
    };
    this.form.patchValue(user);
  }

  onSubmit(): void {
    const formData = this.form.getRawValue();
    // TODO add validation
    super.mutateData(formData as User);
    console.log(formData);
  }
}
