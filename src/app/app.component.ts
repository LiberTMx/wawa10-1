import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';

import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastMessageService, ToastMessage } from './common/services/toast-message.service';

import { MessageService as PrimengMessageService } from 'primeng/api';
import { State } from '@ngrx/store';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PrimengMessageService]
})
export class AppComponent implements OnInit, OnDestroy
{
  title = 'Liwa Site 2';

  ckeckingBrowser=true;
  browserAllowed=true;

  toastMessageEventsSubscription: Subscription;
  
  constructor(
    private appService: AppService,
    private deviceService: DeviceDetectorService,
    private primengMessageService: PrimengMessageService,
    private router: Router, 
    private toastMessageService: ToastMessageService,
    private store: State<AppState>,
  ) {
    console.log('app constructor called !');
  }

  ngOnInit(): void
  {
    this.toastMessageEventsSubscription = this.toastMessageService.toastMessageEvents
      .subscribe( (toastMessage: ToastMessage) => this.primengMessageService.add( toastMessage) );

    const browserName=this.deviceService.browser;
    console.log('browser:', browserName);
    if(browserName==='IE' || browserName==='MS-Edge')
    {
      this.browserAllowed=false;
    }
    this.ckeckingBrowser=false;

    this.preloadStaticData();

    this.router.navigate(['default']);
  }

  ngOnDestroy() 
  {
    if (this.toastMessageEventsSubscription) 
    {
      this.toastMessageEventsSubscription.unsubscribe();
    }
  }

 
  preloadStaticData()
  {

  }
}
