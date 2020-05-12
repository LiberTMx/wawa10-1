import { Component, OnInit, Input } from '@angular/core';
import { EntrainementGroupeSeanceModel } from '../../model/entrainement-groupe-seance.model';

@Component({
  selector: 'app-entrainement-groupe-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.scss']
})
export class SeanceComponent implements OnInit {

  @Input()
  seance: EntrainementGroupeSeanceModel;

  constructor() { }

  ngOnInit(): void 
  {
  }

}
