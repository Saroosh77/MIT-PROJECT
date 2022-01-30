import { Component, OnInit } from '@angular/core';
import { RoomsService } from './rooms.service';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Room } from '../rooms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(private service: RoomsService, private formBuilder: FormBuilder) { }
  dateRangeForm: FormGroup;

  range = new FormGroup({
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required)
  });

  rooms = [];
  selectedRoom: Room;
  isRoomSelected = false;
  successMsg = ""

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.service.getRooms().subscribe({
      next: data => {
        this.rooms = data['result'];
        this.isRoomSelected = false;
      },
      error: error => {
        if(error['statusText'] == "Not Found") {
          this.successMsg = "No Record Exist"
        } else {
          this.successMsg = "No Record Found"
        }
      }
    });
  }

  changeRoom(id: string): void {
    this.successMsg = ""
    this.isRoomSelected = true;
    this.selectedRoom = this.rooms.find(room => room._id == id);
    this.dateRangeForm = this.range
  }

  bookRoom(id: string) {
    if(this.dateRangeForm.valid) {
      this.selectedRoom = this.rooms.find(room => room._id == id);
      this.selectedRoom['isBooked'] = true;
      this.selectedRoom['booked_from'] = this.dateRangeForm.value.fromDate.toISOString();
      this.selectedRoom['booked_to'] = this.dateRangeForm.value.toDate.toISOString();
      this.service.updateRoom(this.selectedRoom).subscribe({
        next: data => {
          this.successMsg = "Room " + this.selectedRoom.name + "-" + this.selectedRoom.roomId  + " Booked Successfully."
        },
        error: error => {
          if(error['statusText'] == "Not Found") {
            this.successMsg = "No Record Exist"
          } else {
            this.successMsg = "No Record Found"
          }
        }
      });
    } else {
      return;
    }
  }
}
