import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: LoginService, private router: Router, private formBuilder: FormBuilder) {
    if(this.router.getCurrentNavigation().extras.state != undefined) {
      this.successMsg = this.router.getCurrentNavigation().extras.state.message
    }
  }

  loginForm: FormGroup;
  successMsg: string;

  get formControls() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.initializeForm()
    if (localStorage.getItem('access_token') !== null) {
      this.router.navigate(['/user'], { state: { token: localStorage.getItem('access_token') } });
    }
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login(): void {
    if (this.isEmail(this.loginForm.value.email) && this.loginForm.valid) {
      this.service.loginUser(this.loginForm.value).subscribe({
        next: data => {
          this.successMsg = "Login Successful"
          localStorage.setItem('access_token', data['result']['token'])
          this.router.navigate(['/user'], { state: { token: data['result']['token'] } });

        },
        error: error => {
          if(error['statusText'] == "Not Found") {
            this.successMsg = "Email Does Not Exist"
          } else if(error['statusText'] == "Unauthorized") {
            this.successMsg = "Password is Incorrect"
          } else {
            this.successMsg = "User Not Found"
          }
        }
      })
    }
    else if(!this.isEmail(this.loginForm.value.email) && this.loginForm.value.password == "") {
      this.successMsg = "Email or Password Is Empty"
    } else if(!this.isEmail(this.loginForm.value.email)) {
      this.successMsg = "Email Is Required"
    } else if(this.loginForm.value.email == "" || this.loginForm.value.email == null || this.loginForm.value.email == undefined) {
      this.successMsg = "Email Is Required"
    } else if(this.loginForm.value.password == "" || this.loginForm.value.password == null || this.loginForm.value.password == undefined) {
      this.successMsg = "Password Is Required"
    } else {
      this.successMsg = "Email Is Not Valid"
    }
  }

  isEmail(email: string): Boolean {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email)
  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
