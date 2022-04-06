import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogComponent } from '../dialogues/confirm-dialog/confirm-dialog.component';
import { BundleService } from '../services/bundle.service';
import { MessagesService } from '../services/mesages.service';
import { ValidationService } from '../services/validation.service';
import { SimpleStringInputComponent } from './simple-string-input/simple-string-input.component';

@NgModule({
  declarations: [SimpleStringInputComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [SimpleStringInputComponent, ConfirmDialogComponent],
  providers: [ValidationService, BundleService, MessagesService],
})
export class SharedModule {}
