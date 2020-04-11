import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../../../common/message/message.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { ToastMessageService } from '../../../common/services/toast-message.service';
import { LoginAction } from '../state/actions/auth-login.action';
import { AuthenticatedUserModel } from '../model/authenticated-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{
  loginForm: FormGroup;
  error: string=null;

  constructor( 
    private authService: AuthService,
    //private comiteService: ComiteService,
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private store: Store<AppState>,
    private toastMessageService: ToastMessageService
   ) { }
   
  ngOnInit(): void 
  {
    this.messageService.resetMessage();
    //this.prepareActForm();
    this.loginForm = new FormGroup({
    username: new FormControl('', {
        validators: [Validators.required]
    }),
    password: new FormControl('', { validators: [Validators.required] })
    });
  }
  
  isUsernameFieldEmpty()
  {
      const username: string=this.loginForm.value.username;
      // console.log('username:'+username);
      if(username===undefined || username==null || username.length===0)
      {
        return true;
      }
      return false;
  }

  onSubmit() 
  {
    // console.log(this.loginForm);
    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    )
    .subscribe( 
        (user: AuthenticatedUserModel) => {
              console.log('login ok', user);
              if(user.mustChangePassword===true)
              {
                this.toastMessageService.addWarn('Login', 'Bonjour '+user.prenom+', changement de mot de passe obligatoire!');
                this.router.navigate(['auth', 'changePassword']);
                this.preLogin(user);
              }
              else
              {
                // console.warn('login post process NOT called!');
                this.toastMessageService.addSuccess('Login', 'Bonjour '+user.prenom);
                this.postLogin(user);
                this.router.navigate(['default']);
              }
            }
      ,
        err =>{
          this.error='InvalidUserOrPassword';
          console.error('login fails - '+err.error.message, err );
          this.toastMessageService.addError('Login erroné - Accès refusé!', 'Désolé, username et/ou mot de passe incorrect(s)!');
        }
    );
    
  }

  preLogin( user: AuthenticatedUserModel)
  {
    this.authService.preProcessLogin(user);
  }

  postLogin( user: AuthenticatedUserModel)
  {
    this.authService.postProcessLogin(user);
  }

  onResendPassword()
  {
    const username: string=this.loginForm.value.username;
    this.authService.resentPassword( username )
      .subscribe(
        res => {
          console.log('Password resent - message:'+JSON.stringify(res));
          this.messageService.emitMessage('success', 'Vos informations utilisateur ont été envoyées');
        },
        err => 
        { 
          console.error( JSON.stringify(err));
          const status=err.status;
          if( status===400)
          {
              const error=err.error;
              const message=error.message;
              const errMessage=error.error;
              // const body=err['_body'];
              console.log('Error :'+message);
              // const mm=JSON.parse(body);
              // this.message.setMessage(mm.message, this.message.messageEnum.ERROR);
              this.messageService.emitMessage('danger', 'Technical error ! - '+errMessage); 
          }
          else
          {
            this.messageService.emitMessage('danger', 'Technical error !');  
          }
        }
    );
  }

  onCancelLogin()
  {
    this.router.navigate(['/']);
  }
}
