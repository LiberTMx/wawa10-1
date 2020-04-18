import { Component, OnInit } from '@angular/core';
import { FonctionService } from '../services/fonction.service';
import { AuthFonctionModel } from '../model/auth-fonction.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-fonctions',
  templateUrl: './fonctions.component.html',
  styleUrls: ['./fonctions.component.scss']
})
export class FonctionsComponent implements OnInit {

  authFonctions: Array<AuthFonctionModel>=null;
  
  fonctionForm: FormGroup;

  constructor(
    private fonctionService: FonctionService,
    private formBuilder: FormBuilder, 
  ) { }

  ngOnInit(): void 
  {
    this.prepareForm();

    this.fonctionService.getAllFonctions()
      .subscribe(
        res => {
          this.authFonctions = res; 
          console.log('Liste des fonctions:', res);
        }
      );
  }

  prepareForm()
  {
    this.fonctionForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(3)] ],
      designation: ['', [Validators.required, Validators.minLength(5)] ],
      description: [''],
    });
  }

  get code() { return this.fonctionForm.get('code'); }
  get designation() { return this.fonctionForm.get('designation'); }

  onCreateFonction()
  {
    const formValue=this.fonctionForm.value;
    console.log('Creating new auth fonction', formValue.designation, formValue.code, formValue.description);
    this.fonctionService.createNewFonction(formValue.code.toUpperCase(), formValue.designation, formValue.description)
      .subscribe( (res: AuthFonctionModel) => {
        if(res!==null && res!==undefined)
        {
          this.fonctionForm.reset();
          let newFonctions = new Array<AuthFonctionModel>();
          Object.assign(newFonctions, this.authFonctions);
          newFonctions.push(res);
          newFonctions = newFonctions.sort( (d1, d2) => {
            if(d1.code < d2.code) return -1;
            if(d1.code > d2.code) return 1;
            return 0;
          });
          this.authFonctions=newFonctions;
          // this.domainEvent.emit( {eventName: 'DOMAIN_ADDED', domains: this.domains} );
        }
      });
  }

}
