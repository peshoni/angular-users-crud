import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BundleService } from '../services/bundle.service';
import { ValidationService } from '../services/validation.service';
import { SimpleStringInputComponent } from './simple-string-input/simple-string-input.component';

@NgModule({
  declarations: [SimpleStringInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [SimpleStringInputComponent],
  providers: [ValidationService, BundleService],
})
export class SharedModule {}
