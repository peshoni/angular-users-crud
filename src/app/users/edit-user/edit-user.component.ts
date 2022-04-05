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
      // process data
      console.log(this.user);
      this.form.patchValue(this.user);
    } else {
      // go back amd notify
      history.back();
    }
  }

  onSubmit(): void {
    const formData = this.form.getRawValue();
    //TODO add GENDER
    const set_input: Users_Set_Input = {
      age: formData.age,
      name: formData.name,
      family: formData.family,
      profession: formData.profession,
    };
    this.userService
      .updateUser(this.user.id, set_input)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
