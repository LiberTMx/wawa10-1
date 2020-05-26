import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-zoom-dialog',
  templateUrl: './image-zoom-dialog.component.html',
  styleUrls: ['./image-zoom-dialog.component.scss']
})
export class ImageZoomDialogComponent implements OnInit {

  dialogData: {
    image: any,
    width: number,
    height: number
  };

  timeoutHandler: any;

  constructor(
    private dialogRef: MatDialogRef<ImageZoomDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    data: {
      image: any,
      width: number,
      height: number
    },
  ) 
  {
    this.dialogData = data;
  }

  ngOnInit(): void {
  }

  onCloseDialog(data: {image: any, width: number, height: number} ) 
  {
    this.dialogRef.close(data);
  }

  onSave()
  {
    this.dialogRef.close(this.dialogData);
  }

  onCancel()
  {
    this.onCloseDialog(null);
  }

  onDecreaseImageWidth()
  {
    this.dialogData.width--;
  }

  onIncreaseImageWidth()
  {
    this.dialogData.width++;
  }

  onDecreaseImageHeight()
  {
    this.dialogData.height--;
  }

  onIncreaseImageHeight()
  {
    this.dialogData.height++;
  }

  public mouseup() 
  {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  }

  public mousedown(op: string) 
  {
    this.timeoutHandler = setInterval(() => {
      if(op==='dw') this.dialogData.width--;
      if(op==='iw') this.dialogData.width++;
      if(op==='dh') this.dialogData.height--;
      if(op==='ih') this.dialogData.height++;
    }, 100);
  }

}
