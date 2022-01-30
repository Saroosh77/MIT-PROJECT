import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-international',
  templateUrl: './international.component.html',
  styleUrls: ['./international.component.css']
})
export class InternationalComponent implements OnInit {

  constructor() { }

  externalLink1: string = "https://www.th-deg.de/en/students/going-abroad";
  externalLink2: string = "https://www.th-deg.de/exchange-students";
  externalLink3: string = "https://www.th-deg.de/int-students";

  ngOnInit(): void {
  }

}
