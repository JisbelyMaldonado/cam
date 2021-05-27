import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication/authentication.service';
import { Users } from '../../interfaces/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-landing',
  templateUrl: './login-landing.component.html',
  styleUrls: ['./login-landing.component.css']
})
export class LoginLandingComponent implements OnInit {

  public userLogin : Users;
  public loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
    ]),
    password: new FormControl("", Validators.required),
  });

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    $('#exampleModalLong').modal('show')
    this.userLogin = {};
  }

  public onLogin(userLogin: Users, valid: boolean) {
   
    
    if (valid) {
      if (userLogin) {
        this.authService.login(userLogin.user_email, userLogin.user_password).then(() => {
          $('#modal-login').modal('hide')
        });
      }
    }
  }

}
