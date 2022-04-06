import { Component, Injector, OnInit } from '@angular/core';
import { BundleService } from 'src/app/services/bundle.service';
import { Users, Users_Set_Input } from 'src/generated/graphql';
import { UserBaseComponent } from '../user-base/user-base.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent extends UserBaseComponent implements OnInit {
  private user: Users;
  constructor(injector: Injector, private bundle: BundleService) {
    super(injector);
  }

  ngOnInit(): void {
    this.user = this.bundle.getUser();
    if (this.user) {
      this.form.patchValue(this.user);
    } else {
      // go back and notify user
      this.notifyUser('error', 'Something went wrong. Please excuse us.', 3500);
      history.back();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.valido.validateAllFormFields(this.form);
      return;
    }
    const formData = this.form.getRawValue();
    const set_input: Users_Set_Input = {
      age: formData.age,
      name: formData.name,
      family: formData.family,
      profession: formData.profession,
      gender: formData.gender,
    };
    this.userService
      .updateUser(this.user.id, set_input)
      .subscribe(({ data, errors }) => {
        if (errors) {
          this.notifyUser('error', 'Something went wrong. Please excuse us.');
        } else if (data) {
          this.notifyUser('success', 'The data was added succesfully.');
        }
        this.goToUsersList();
      });
  }
}
