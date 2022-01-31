import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { JwtService } from '../jwt.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: LoginService, private jwtservice: JwtService, private router: Router, private formBuilder: FormBuilder, private snackbar: MatSnackBar) { 
    
  }

  loginForm: FormGroup;
  message: string;

  get formControls() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.initializeForm()
    if(localStorage.getItem('access_token') !== null) {
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
    this.service.loginUser(this.loginForm.value).subscribe({
      next: res => {
        this.jwtservice.login(res);
        this.message = "Login Successful!";
        this.openSnackBar(this.message);
        this.router.navigateByUrl('/user');
      },
      error: error => {
        this.message = "Invalid login!";
        this.openSnackBar(this.message);
      }
    })
  }
  register(): void {
    this.router.navigate(['/register']);
  }

  openSnackBar(message: string) {
    this.snackbar.open(message);
  }
}