import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private service: NewsService) { }

  news = [];
  externalLink: string;

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.service.getNews().subscribe({
      next: data => {
        this.news = data['result'];
      },
    });
  }

  gotoDetail(id: string): void {
    this.service.getNewsById(id).subscribe({
      next: data => {
        this.news = data['result'];
        // this.isArticle = true;
        // this.isArticles = false;
      },
      // error: error => {
      //   if(error['statusText'] == "Not Found") {
      //     this.successMsg = "No Detail Exist"
      //   } else {
      //     this.successMsg = "No Detail Found"
      //   }
      // }
    });
  }

}
