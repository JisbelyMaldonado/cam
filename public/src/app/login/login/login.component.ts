import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
/** INTERFACE */

/** SERVICE */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public userLogin : UserLogin;
  // array = [];
  // public loginForm = new FormGroup({
  //   email: new FormControl("", [
  //     Validators.required,
  //     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
  //   ]),
  //   password: new FormControl("", Validators.required),
  // });
  constructor() { }

  ngOnInit(): void {
    // this.userLogin = {};
  }

  // public onLogin(userLogin: UserLogin, valid: boolean) {
  //   if (valid) {
  //     if (userLogin) {
  //       this.authService.login(userLogin.email, userLogin.password)
  //     }
  //   }
  // }
}
