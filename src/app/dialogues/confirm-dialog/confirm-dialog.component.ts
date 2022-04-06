import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  okButtonLabel = 'Confirm';
  cancelButtonLabel = 'Cancel';
  firstButtonVisible = true;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.dialogData?.firstButtonVisible !== undefined) {
      this.firstButtonVisible = data.dialogData?.firstButtonVisible;
    }
    if (data.dialogData?.okButtonLabel) {
      this.okButtonLabel = data.dialogData.okButtonLabel;
    }
    if (data.dialogData?.cancelButtonLabel) {
      this.cancelButtonLabel = data.dialogData.cancelButtonLabel;
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ result: 'cancel' });
  }

  onYesClick(): void {
    this.dialogRef.close({ result: 'ok' });
  }
}
