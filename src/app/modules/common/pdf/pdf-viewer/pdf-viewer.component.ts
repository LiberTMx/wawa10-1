import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  @Input()
  selectedDocument: string;

  loc=location.protocol+'//'+location.host;
  pdfDocument=this.loc+'/assets/news/docs/pdf/communication-covid-19.pdf';

  withDetails=false;

  constructor() { }

  ngOnInit(): void 
  {
    // console.log('selected document input:', this.selectedDocument);
    this.pdfDocument = this.selectedDocument;
  }

  onSwitchWithDetails()
  {
    this.withDetails= ! this.withDetails;
  }
}
