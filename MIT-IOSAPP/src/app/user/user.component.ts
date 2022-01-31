import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service: UserService, private jwtService: JwtService, private router: Router) { }
  
  name: string;
  email: string;

  ngOnInit(): void {
    let x = (JSON.parse(localStorage.getItem("user")))
      this.name = x.name;
      this.email = x.email;
  }
  

  

  isUserAdmin(): boolean {
    let x = this.jwtService.IsUserAdmin()
    return x
  }

  logout() {
    this.jwtService.logout();
    this.router.navigateByUrl('/login');
  }
}
