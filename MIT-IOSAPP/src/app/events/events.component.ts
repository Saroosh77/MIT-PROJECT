import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { RoomsService } from './../rooms/rooms.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateEvent } from '../event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private service: EventService, private roomsService: RoomsService, private router: Router, private formBuilder: FormBuilder) { }

  event: object;
  events = [];
  successMsg: string;
  createForm: FormGroup;
  rooms = []

  get formControls() { return this.createForm.controls; }

  ngOnInit(): void {
    this.getAll()
    this.initializeForm()
  }

  getAll(): void {
    this.service.getEvent().subscribe({
      next: data => {
        this.events = data['result'];
        for (let i = 0; i < this.events.length; i++) {
          this.roomsService.getRoomById(this.events[i]['room']).subscribe(data => {
            this.events[i]['room'] = data['result'];
          });
        }
      },
      error: error => {
        if (error['statusText'] == "Not Found") {
          this.successMsg = "No Record Exist"
        } else {
          this.successMsg = "No Record Found"
        }
      }
    });
  }

  gotoDetail(id: string): void {
    this.service.getEventById(id).subscribe({
      next: data => {
        this.event = data['result'];
        this.roomsService.getRoomById(this.event['room']).subscribe(data => {
          this.event['room'] = data['result'];
        });
      },
      error: error => {
        if (error['statusText'] == "Not Found") {
          this.successMsg = "No Detail Exist"
        } else {
          this.successMsg = "No Detail Found"
        }
      }
    });
  }

  getRoomsFromDb(): void {
    this.roomsService.getFreeRooms().subscribe({
      next: data => {
        this.rooms = data['result'];
      },
      error: error => {
        if (error['statusText'] == "Not Found") {
          this.successMsg = "Please Create Room First"
        } else {
          this.successMsg = "No Room Found"
        }
      }
    });
  }

  initializeForm() {
    this.createForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      organiser: new FormControl('', Validators.required),
      participants: new FormControl('', Validators.required),
      room: new FormControl('', Validators.required),
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required)
    });
    this.getRoomsFromDb();
  }

  createEvent(): void {
    console.log(this.createForm.value)
    console.log(this.createForm.value.room)
    if (this.isInput(this.createForm.value.title) && this.isInput(this.createForm.value.description) && this.isInput(this.createForm.value.organiser) && this.isInput(this.createForm.value.participants) && this.isInput(this.createForm.value.room) && this.createForm.valid) {
      var event: CreateEvent = {
        title: this.createForm.value.title,
        description: this.createForm.value.description,
        organiser: this.createForm.value.organiser,
        participants: this.createForm.value.participants,
        room: this.createForm.value.room,
        event_from: this.createForm.value.fromDate.toISOString(),
        event_to: this.createForm.value.toDate.toISOString()
      }
      this.service.createEvent(event).subscribe({
        next: data => {
          console.log(data)
          this.successMsg = "Event Created Successful"
        },
        error: error => {
          console.log(error)
          if (error['statusText'] == "Bad Request") {
            this.successMsg = "Event Already Exist"
          } else {
            this.successMsg = "Event Not Created"
          }
        }
      })
    } else if (!this.isInput(this.createForm.value.title) && !this.isInput(this.createForm.value.description) && !this.isInput(this.createForm.value.organiser) && !this.isInput(this.createForm.value.participants) && !this.isInput(this.createForm.value.room)) {
      this.successMsg = "Title or Description or Link Is Empty"
    } else if (!this.isInput(this.createForm.value.title)) {
      this.successMsg = "Title is Not Valid"
    } else if (!this.isInput(this.createForm.value.description)) {
      this.successMsg = "Description is Not Valid"
    } else if (!this.isInput(this.createForm.value.organiser)) {
      this.successMsg = "Organiser is Not Valid"
    } else if (!this.isInput(this.createForm.value.participants)) {
      this.successMsg = "Participants is Not Valid"
    } else if (this.createForm.value.title === "") {
      this.successMsg = "Title is Required"
    } else if (this.createForm.value.description === "") {
      this.successMsg = "Description is Required"
    } else if (this.createForm.value.organiser === "") {
      this.successMsg = "Organiser is Required"
    } else if (this.createForm.value.participants === "") {
      this.successMsg = "Participants is Required"
    } else {
      this.successMsg = "Form is Not Valid"
    }
    if(this.createForm.valid){
    this.router.navigate(['/events']);
    }
  }

  isInput(name: string): Boolean {
    return (name != "" && name != null && name != undefined) ? true : false
  }

}
