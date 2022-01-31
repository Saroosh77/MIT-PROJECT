import { CreateNews, News } from '../news';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getNewsById(id: string){
    return this.http.get("/api/news/" + id);
  }
  
}
