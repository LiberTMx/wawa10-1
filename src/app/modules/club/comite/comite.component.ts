import { Component, OnInit } from '@angular/core';
import { AuthUserModel } from '../../auth/model/auth-user.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-comite',
  templateUrl: './comite.component.html',
  styleUrls: ['./comite.component.scss']
})
export class ComiteComponent implements OnInit {

  comite: Array<AuthUserModel>;
  
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void 
  {
    this.authService.findUserForClubComite()
      .subscribe( res => {
        //this.users=res;
        this.comite=this.sort(res);
        console.log('composition comite', res);
      }
    );
  }

  sort(users: Array<AuthUserModel>): Array<AuthUserModel>
  {
    users.sort( (u1, u2) => {
      const ordre1=this.getOrdreAffichage(u1);
      const ordre2=this.getOrdreAffichage(u2);

      if(ordre1 < ordre2) return -1;
      if(ordre1 > ordre2) return +1;
      return 0;
    } );
    return users;
  }

  private getOrdreAffichage(u: AuthUserModel): number
  {
    const f=u.fonctions; 
    if(f===null || f===undefined || f.length===0) return 999;

    if(f.length>1)
    {
      f.sort( (f1,f2) => {
          if(f1.ordreAffichage < f2.ordreAffichage) return -1;
          if(f1.ordreAffichage > f2.ordreAffichage) return +1;
          return 0;
      } );
    }
    return f[0].ordreAffichage;
  }

  getFonctions(user: AuthUserModel): string
  {
    const f=user.fonctions; 
    if(f===null || f===undefined || f.length===0) return '';

    if(f.length>1)
    {
      f.sort( (f1,f2) => {
          if(f1.ordreAffichage < f2.ordreAffichage) return -1;
          if(f1.ordreAffichage > f2.ordreAffichage) return +1;
          return 0;
      } );

      let fonctions='';
      let virgule='';
      for(const ff of f)
      {
        fonctions+= virgule+ff.designation;
        if(virgule==='') virgule=', ';
      }
      return fonctions;
    }

    return f[0].designation;
    
  }
}
