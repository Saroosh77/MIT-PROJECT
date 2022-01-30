import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room, CreateRoom } from '../rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) { }

  getRooms(){
    return this.http.get("/api/room");
  }

  getFreeRooms(){
    return this.http.get("/api/room/free");
  }

  getRoomById(id: string){
    return this.http.get("/api/room/" + id);
  }

  updateRoom(room: Room) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.put<Room>("/api/room/"+room._id, room, httpOptions)
  }

  createRoom(room: CreateRoom) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.post<Room>("/api/room", room, httpOptions)
  }
}
