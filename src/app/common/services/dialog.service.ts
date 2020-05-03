import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../utils/dialog-confirm/dialog-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  result: boolean;

  result$: Promise<boolean>;

  constructor(private dialog: MatDialog) { }

  /*
  confirmAsync(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Are you sure?');
    return Observable.of(confirmation);
  }

  confirm(message?: string): boolean {
    return window.confirm(message || 'Are you sure?');
  }

  */

  confirmOK(title: string, message: string): boolean {
    return window.confirm(message || 'Are you sure?');
  }

  confirm(title: string, message: string): Observable<boolean> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = {message, title};

    const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);
    return dialogRef.afterClosed();
  }

  confirmDoNotWork(title: string, message: string): boolean {
    // console.log('dialogref', dialogRef);
    this.doConfirm(title, message);
    console.log('result', this.result);
    return false;
  }

  async doConfirm(title: string, message: string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = {message, title};

    const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);
    // const promise: Promise<any> = dialogRef.afterClosed().toPromise();

    const k = await dialogRef.afterClosed()
      .subscribe(
        (res: boolean) => {
          console.log('dialog result:', res);
          this.result = res;
          return res;
        }
      );
  }
}
