import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  description: string;
  dialogData: {title: string, message: string};

  result: boolean = null;

  constructor(
    private dialogRef: MatDialogRef<DialogConfirmComponent>,

    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string},
    ) {
      this.dialogData = data;
  }

  ngOnInit() {
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onAbort() {
    this.dialogRef.close(false);
  }
}
