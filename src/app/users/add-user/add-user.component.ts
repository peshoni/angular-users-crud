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
    if (this.form.invalid) {
      this.valido.validateAllFormFields(this.form);
      return;
    }
    const formData = this.form.getRawValue();
    this.userService
      .addUser(formData as Users_Insert_Input)
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
