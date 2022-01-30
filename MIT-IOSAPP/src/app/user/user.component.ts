import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.jwtService.logout();
    this.router.navigateByUrl('/login');
  }
}
