import { Component, Injector } from '@angular/core';
import { UserBaseComponent } from '../user-base/user-base.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent extends UserBaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  onSubmit(): void {
    console.log(this.form.getRawValue());
  }
}
