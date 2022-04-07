import {
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { isNullOrUndefined } from 'is-what';
import { BundleService } from 'src/app/services/bundle.service';
import { Users, Users_Set_Input } from 'src/generated/graphql';
import { ImageSnippet } from '../image-snippet.class';
import { UserBaseComponent } from '../user-base/user-base.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent extends UserBaseComponent implements OnInit {
  @ViewChild('imageInput') imageInput: ElementRef;
  imageSnippet: ImageSnippet;
  sanitizedImage: SafeUrl;
  private user: Users;
  constructor(
    injector: Injector,
    private bundle: BundleService,
    private sanitizer: DomSanitizer
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.user = this.bundle.getUser();
    if (this.user) {
      this.form.patchValue(this.user);
      if (this.user.image) {
        this.sanitizedImage = this.getSanitizedImage();
      }
    } else {
      // go back and notify user
      this.notifyUser('error', 'Something went wrong. Please excuse us.', 3500);
      history.back();
    }
  }
  getSanitizedImage(): SafeUrl {
    try {
      return this.sanitizer.bypassSecurityTrustUrl(this.user.image);
    } catch (error) {
      return undefined;
    }
  }
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
    if (this.imageInput) {
      this.imageInput.nativeElement.value = '';
    } else if (this.imageSnippet) {
      delete this.imageSnippet;
    }
    this.sanitizedImage = undefined;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.valido.validateAllFormFields(this.form);
      return;
    }
    const formData = this.form.getRawValue();
    if (this.imageSnippet) {
      formData.image = this.imageSnippet.src;
    } else if (isNullOrUndefined(this.sanitizedImage)) {
      formData.image = null;
    } else {
      formData.image = this.user.image;
    }

    const set_input: Users_Set_Input = {
      age: formData.age,
      name: formData.name,
      family: formData.family,
      profession: formData.profession,
      gender: formData.gender,
      image: formData.image,
    };
    this.userService
      .updateUser(this.user.id, set_input)
      .subscribe(({ data, errors }) => {
        if (errors) {
          this.notifyUser('error', 'Something went wrong. Please excuse us.');
        } else if (data) {
          this.notifyUser('success', 'The data was updated succesfully.');
        }
        this.goToUsersList();
      });
  }
}
