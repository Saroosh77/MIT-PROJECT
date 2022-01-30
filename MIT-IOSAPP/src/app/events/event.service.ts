import { CreateEvent } from './../event';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvent(){
    return this.http.get("/api/event");
  }

  getEventById(id: string) {
    return this.http.get("/api/event/" + id);
  }

  createEvent(event: CreateEvent) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.post<Event>("/api/event", event, httpOptions)
  }
}
