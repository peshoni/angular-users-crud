import {
  Component,
  ElementRef,
  Injector,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Users_Insert_Input } from 'src/generated/graphql';
import { ImageSnippet } from '../image-snippet.class';
import { UserBaseComponent } from '../user-base/user-base.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent extends UserBaseComponent {
  @ViewChild('imageInput') imageInput: ElementRef;
  imageSnippet: ImageSnippet;

  constructor(injector: Injector, private sanitizer: DomSanitizer) {
    super(injector);
  }

  /**
   * Adds user images.
   * @param imageInput
   */
  addFile(imageInput: HTMLInputElement) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.imageSnippet = new ImageSnippet();
      this.imageSnippet.src = event.target.result;
      this.imageSnippet.file = file;
    });
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.imageSnippet = new ImageSnippet();
    this.imageInput.nativeElement.value = '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.valido.validateAllFormFields(this.form);
      return;
    }
    const formData = this.form.getRawValue();
    if (this.imageSnippet) {
      formData.image = this.imageSnippet.src;
    }

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
    return;
  }
}
