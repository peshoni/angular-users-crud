import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { Users_Insert_Input } from 'src/generated/graphql';
import { UserBaseComponent } from '../user-base/user-base.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent extends UserBaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  onSubmit(): void {
    const formData = this.form.getRawValue();
    // TODO add gender
    delete formData.gender;
    this.userService
      .addUser(formData as Users_Insert_Input)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
