import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

interface HashTable<T> {
  [key: string]: string;
}
/**
 * This class must be injected as a public property into constructor to be visible to the template
 */
@Injectable()
export class ValidationService {
  private errorMessages: HashTable<string> = {};
  constructor() {
    try {
      this.loadErrorMessages();
    } catch (error) {
      // *
    }
  }
  private loadErrorMessages(): void {
    this.errorMessages['required'] = 'Required field';
  }

  getErrorMessageFromControl(control: any, patternMessage?: string): string {
    if (control.hasError('required')) {
      return this.errorMessages['required'];
    } else if (control.hasError('minlength')) {
      return (
        'Minimun lenght : ' +
        control.errors.minlength.requiredLength +
        ' symbols'
      );
    } else if (control.hasError('maxlength')) {
      return (
        'Maximum length : ' +
        control.errors.maxlength.requiredLength +
        ' symbols'
      );
    } else if (control.hasError('pattern')) {
      return 'Invalid format. ' + patternMessage;
    } else if (control.hasError('min')) {
      return 'Minimum value: ' + control.errors.min.min;
    } else if (control.hasError('exist')) {
      return 'Already exist in database';
    } else if (control.hasError('max')) {
      return 'Maximum value: ' + control.errors.max.max;
    } else if (control.errors) {
      // describe next missing error message here
      console.log(control.errors);
      return 'error';
    }
    return '';
  }

  getValidatorFnForNames(): ValidatorFn[] {
    return [
      Validators.required,
      Validators.pattern('[a-zA-Z ?]+'), // for `Ivan` or `Ana Maria`
    ];
  }

  getValidatorFnForProffesion(): ValidatorFn[] {
    return [
      Validators.required,
      Validators.pattern('[a-zA-Z- ]+'), // for `programmer-analyst` or `driver`
    ];
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (!control.valid) {
          console.log(control.errors);
          console.log('Invalid field: ' + field);
        }
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
