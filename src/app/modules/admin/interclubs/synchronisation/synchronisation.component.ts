import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AfttAllDataEntity } from '../model/aftt/aftt-all-data.entity';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-synchronisation',
  templateUrl: './synchronisation.component.html',
  styleUrls: ['./synchronisation.component.scss']
})
export class SynchronisationComponent implements OnInit {

  @Input()
  afttSyncInfo: AfttAllDataEntity;
  
  @Output()
  synchronizeEvent=new EventEmitter<any>();
  
  synchronizing=false;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
  }

  onSynchroniseNow()
  {
    this.synchronizing = true;
    
    this.adminService.synchronizeNow()
      .subscribe(
        res => {
          this.adminService.processSyncData()
            .subscribe(
              sync => this.loadData(),
              err => console.error('Processing sync error !', err),
              () => this.synchronizing=false
            );
        },
        err => {
          console.error('synchronize error !', err);
          this.synchronizing=false;
        }
      );

  }

  onProcessNow()
  {
    this.synchronizing = true;
    /*
    this.adminService.synchronizeNow()
      .subscribe(
        res => {
          this.adminService.processSyncData()
            .subscribe(
              sync => this.loadData(),
              err => console.error('Processing sync error !', err),
              () => this.synchronizing=false
            );
        },
        err => {
          console.error('synchronize error !', err);
          this.synchronizing=false;
        }
      );
    */
    this.adminService.processSyncData()
          .subscribe(
            sync => this.loadData(),
            err => console.error('Processing sync error !', err),
            () => this.synchronizing=false
          );
  }

  loadData()
  {
    this.synchronizeEvent.emit();
  }
}
