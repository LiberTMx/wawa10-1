import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { MessageService as PrimengMessageService } from 'primeng/api';

export interface ToastMessage {
  severity: string; // 'warn',
  summary: string; // 'Creation d\'un node',
  detail: string; // 'Un nouveau node a été ajouté !',
  life: number; // 5000
}
@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  // toastMessage: ToastMessage ;
  public toastMessageEvents = new BehaviorSubject<ToastMessage>(undefined);

  constructor(
    // private primengMessageService: PrimengMessageService
  ) { }

  // primeng: Severity level of the message, valid values are "success", "info", "warn" and "error".

  addInfo( summary: string, details: string, lifeTime: number=3000) {
    this.toastMessageEvents.next(
      {
        severity: 'info',
        summary: '' + summary,
        detail: '' + details,
        life: lifeTime /* 3000 */
    }
    );
  }

  addSuccess( summary: string, details: string, lifeTime: number=3000) {
    this.toastMessageEvents.next(
      {
        severity: 'success',
        summary: '' + summary,
        detail: '' + details,
        life: lifeTime /* 3000 */
    }
    );
  }

  addWarn( summary: string, details: string, lifeTime: number=5000) {
    this.toastMessageEvents.next(
      {
        severity: 'warn',
        summary: '' + summary,
        detail: '' + details,
        life: lifeTime /* 5000 */
    }
    );
  }

  addError( summary: string, details: string, lifeTime: number=7000) {
    this.toastMessageEvents.next(
      {
        severity: 'error',
        summary: '' + summary,
        detail: '' + details,
        life: lifeTime /* 7000 */
    }
    );
  }
}
