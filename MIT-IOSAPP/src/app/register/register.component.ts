import { Component, OnInit } from '@angular/core';
import { RegisterService } from './../register/register.service';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUser } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: RegisterService, private router: Router, private formBuilder: FormBuilder) { }

  registerForm: FormGroup;

  successMsg = ""

  get formControls() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    });
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  register(): void {
    if(this.isName(this.registerForm.value.name) && this.isEmail(this.registerForm.value.email) && this.isPassword(this.registerForm.value.password, this.registerForm.value.password2) && this.registerForm.valid) {
      var user: CreateUser = {name: this.registerForm.value.name, email: this.registerForm.value.email, password: this.registerForm.value.password}

      this.service.registerUser(user).subscribe({
        next: data => {
          this.successMsg = "Registration Successful"
          this.router.navigate(['/login'], { state: { message: 'User Created Successfully' } });
        },
        error: error => {
          if(error['statusText'] == "Bad Request") {
            this.successMsg = "Email Already Exist"
          } else {
            this.successMsg = "User Not Created"
          }
        }
      })
    } else if(!this.isEmail(this.registerForm.value.email) && this.registerForm.value.password == "" && this.registerForm.value.password2 == "") {
      this.successMsg = "Email or Password Is Empty"
    } else if(!this.isEmail(this.registerForm.value.email)) {
      this.successMsg = "Email Is Not Valid"
    } else if(!this.isPassword(this.registerForm.value.password, this.registerForm.value.password2)) {
      this.successMsg = "Password Does Not Match or Password must be at least 6 Characters Long"
    } else if(this.registerForm.value.email == "" || this.registerForm.value.email == null || this.registerForm.value.email == undefined) {
      this.successMsg = "Email Is Required"
    } else if(this.registerForm.value.password == "" || this.registerForm.value.password == null || this.registerForm.value.password == undefined) {
      this.successMsg = "Password Is Required"
    } else if(this.registerForm.value.password2.length < 6) {
      this.successMsg = "Password must be at least 6 Characters Long"
    } else if(this.registerForm.value.password2 == "" || this.registerForm.value.password2 == null || this.registerForm.value.password2 == undefined) {
      this.successMsg = "Confirm Password Is Required"
    } else if(this.registerForm.value.password2.length < 6) {
      this.successMsg = "Confirm Password must be at least 6 Characters Long"
    } else if(this.registerForm.value.name == "" || this.registerForm.value.name == null || this.registerForm.value.name == undefined) {
      this.successMsg = "Name Is Required"
    } else {
      this.successMsg = "Form Is Not Valid"
    }
  }

  isName(name: string): Boolean {
    return (name != "" && name != null && name != undefined) ? true : false
  }

  isEmail(email: string): Boolean {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email)
  }

  isPassword(pass1: string, pass2: string): Boolean {
    return pass1 === pass2 && pass1.length >= 6 && pass2.length >= 6
  }

}
