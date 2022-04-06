import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';

@Injectable()
export class MessagesService {
  constructor(private snackBar: MatSnackBar) {}
  notifyUser(
    type: string,
    message: string,
    duration = null
  ): MatSnackBarRef<TextOnlySnackBar> {
    const matSnackBarConfig: MatSnackBarConfig = {
      duration,
      panelClass: [`${type}-snackbar`],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    };
    return this.snackBar.open(message, 'OK', matSnackBarConfig);
  }
}
