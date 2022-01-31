import { Component, OnInit } from '@angular/core';
import { EventService } from './../events/event.service';
import { RoomsService } from './../rooms/rooms.service';
import { NewsService } from './../homepage/news.service';
import { AppointmentsService } from './../appointments/appointments.service';
import { RegisterService } from './../register/register.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateEvent } from '../event';
import { CreateNews } from '../news';
import { CreateRoom } from '../rooms';
import { Appointment } from '../appointment';
import { CreateUser } from '../user';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  event: object;
  events = [];
  successMsg: string;
  NewsForm: FormGroup;
  EventForm: FormGroup;
  RoomForm: FormGroup;
  AppForm: FormGroup;
  UserForm: FormGroup;
  rooms = []
  // selected: any;

  get formControls1() { return this.NewsForm.controls; }
  get formControls2() { return this.EventForm.controls; }
  get formControls3() { return this.RoomForm.controls; }
  get formControls4() { return this.AppForm.controls; }
  get formControls5() { return this.UserForm.controls; }
  
  constructor(private eventService: EventService, private roomsService: RoomsService, private newsService: NewsService, private appointmentService: AppointmentsService, private userService: RegisterService, private jwtService: JwtService, private router: Router, private formBuilder: FormBuilder, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.initializeNewsForm()
    this.initializeEventForm()
    this.initializeRoomForm()
    this.initializeAppForm()
    this.initializeUserForm()
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



  initializeNewsForm() {

        this.NewsForm = this.formBuilder.group({
          title: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          link: new FormControl('http://', Validators.required)
        });
      }

  initializeEventForm() {

        this.EventForm = this.formBuilder.group({
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

  initializeRoomForm() {
        this.RoomForm = this.formBuilder.group({
          roomId: new FormControl(0, Validators.required),
          name: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required)
        });
  }

  initializeAppForm() {
        this.AppForm = this.formBuilder.group({
          name: new FormControl('', Validators.required),
          email: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          fromDate: new FormControl('', Validators.required),
          toDate: new FormControl('', Validators.required)
        });
  }

  initializeUserForm() {
        this.UserForm = this.formBuilder.group({
          name: new FormControl('', Validators.required),
          email: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required),
          password2: new FormControl('', Validators.required)
        });
      }
 

  //Create Event
  createEvent(): void {
    console.log(this.EventForm.value)
    console.log(this.EventForm.value.room)
    if (this.isInput(this.EventForm.value.title) && this.isInput(this.EventForm.value.description) && this.isInput(this.EventForm.value.organiser) && this.isInput(this.EventForm.value.participants) && this.isInput(this.EventForm.value.room) && this.EventForm.valid) {
      var event: CreateEvent = {
        title: this.EventForm.value.title,
        description: this.EventForm.value.description,
        organiser: this.EventForm.value.organiser,
        participants: this.EventForm.value.participants,
        room: this.EventForm.value.room,
        event_from: this.EventForm.value.fromDate.toISOString(),
        event_to: this.EventForm.value.toDate.toISOString()
      }
      this.eventService.createEvent(event).subscribe({
        next: data => {
          console.log(data)
          this.successMsg = "Event Created Successfully!"

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
    } else if (!this.isInput(this.EventForm.value.title) && !this.isInput(this.EventForm.value.description) && !this.isInput(this.EventForm.value.organiser) && !this.isInput(this.EventForm.value.participants) && !this.isInput(this.EventForm.value.room)) {
      this.successMsg = "Title or Description or Link Is Empty"
    } else if (!this.isInput(this.EventForm.value.title)) {
      this.successMsg = "Title is Not Valid"
    } else if (!this.isInput(this.EventForm.value.description)) {
      this.successMsg = "Description is Not Valid"
    } else if (!this.isInput(this.EventForm.value.organiser)) {
      this.successMsg = "Organiser is Not Valid"
    } else if (!this.isInput(this.EventForm.value.participants)) {
      this.successMsg = "Participants is Not Valid"
    } else if (this.EventForm.value.title === "") {
      this.successMsg = "Title is Required"
    } else if (this.EventForm.value.description === "") {
      this.successMsg = "Description is Required"
    } else if (this.EventForm.value.organiser === "") {
      this.successMsg = "Organiser is Required"
    } else if (this.EventForm.value.participants === "") {
      this.successMsg = "Participants is Required"
    } else {
      this.successMsg = "Form is Not Valid"
    }
  }

  //Create Appointment
  createAppointment(): void {
    if(this.isInput(this.AppForm.value.title) && this.isInput(this.AppForm.value.description) && this.isUrl(this.AppForm.value.link) && this.AppForm.valid) {
      var appointment: Appointment = {
        name: this.AppForm.value.name,
        email: this.AppForm.value.email,
        description: this.AppForm.value.description,
        booked_from: this.AppForm.value.fromDate.toISOString(),
        booked_to: this.AppForm.value.toDate.toISOString()
      }
      this.appointmentService.createAppointment(appointment).subscribe({
        next: data => {
          this.successMsg = "Appointment Created Successful"
        },
        error: error => {
          if(error['statusText'] == "Bad Request") {
            this.successMsg = "Appointment Already Exist"
          } else {
            this.successMsg = "Appointment Not Created"
          }
        }
      })
    } else if(!this.isInput(this.AppForm.value.title) && !this.isInput(this.AppForm.value.description) && !this.isUrl(this.AppForm.value.link)) {
      this.successMsg = "Title or Description or Link Is Empty"
    } else if(!this.isInput(this.AppForm.value.title)) {
      this.successMsg = "Title is Not Valid"
    } else if(!this.isInput(this.AppForm.value.description)) {
      this.successMsg = "Description is Not Valid"
    } else if(!this.isUrl(this.AppForm.value.link)) {
      this.successMsg = "Link is Not Valid"
    } else if(this.AppForm.value.title === "") {
      this.successMsg = "Title is Required"
    } else if(this.AppForm.value.description === "") {
      this.successMsg = "Description is Required"
    } else if(this.AppForm.value.link === "") {
      this.successMsg = "Link is Required"
    } else {
      this.successMsg = "Form is Not Valid"
    }
  }

  //Create News
  createNews(): void {
    if(this.isInput(this.NewsForm.value.title) && this.isInput(this.NewsForm.value.description) && this.isUrl(this.NewsForm.value.link) && this.NewsForm.valid) {
      var news: CreateNews = {
        title: this.NewsForm.value.title,
        description: this.NewsForm.value.description,
        link: this.NewsForm.value.link
      }
      this.newsService.createNews(news).subscribe({
        next: data => {
          this.successMsg = "News Created Successful"
          this.openSnackBar(this.successMsg)
          this.NewsForm.reset()
        },
        error: error => {
          if(error['statusText'] == "Bad Request") {
            this.successMsg = "News Already Exist"
          } else {
            this.successMsg = "News Not Created"
          }
        }
      })
    } else if(!this.isInput(this.NewsForm.value.title) && !this.isInput(this.NewsForm.value.description) && !this.isUrl(this.NewsForm.value.link)) {
      this.successMsg = "Title or Description or Link Is Empty"
    } else if(!this.isInput(this.NewsForm.value.title)) {
      this.successMsg = "Title is Not Valid"
    } else if(!this.isInput(this.NewsForm.value.description)) {
      this.successMsg = "Description is Not Valid"
    } else if(!this.isUrl(this.NewsForm.value.link)) {
      this.successMsg = "Link is Not Valid"
    } else if(this.NewsForm.value.title === "") {
      this.successMsg = "Title is Required"
    } else if(this.NewsForm.value.description === "") {
      this.successMsg = "Description is Required"
    } else if(this.NewsForm.value.link === "") {
      this.successMsg = "Link is Required"
    } else {
      this.successMsg = "Form is Not Valid"
    }
  }

  //Create Room
  createRoom(): void {
    if(this.isNumber(this.RoomForm.value.roomId) && this.isInput(this.RoomForm.value.name) && this.isInput(this.RoomForm.value.description) && this.RoomForm.valid) {
      var room: CreateRoom = {
        booked_from: null,
        booked_to: null,
        roomId: this.RoomForm.value.roomId,
        name: this.RoomForm.value.name,
        description: this.RoomForm.value.description,
        isBooked: false
      }
      this.roomsService.createRoom(room).subscribe({
        next: data => {
          this.successMsg = "Room Created Successful"
        },
        error: error => {
          if(error['statusText'] == "Bad Request") {
            this.successMsg = "Room-Id Already Exist"
          } else {
            this.successMsg = "Room Not Created"
          }
        }
      })
    } else if(!this.isNumber(this.RoomForm.value.roomId) && !this.isInput(this.RoomForm.value.name) && !this.isInput(this.RoomForm.value.description)) {
      this.successMsg = "Room-Id or Name or Description Is Empty"
    } else if(!this.isNumber(this.RoomForm.value.roomId)) {
      this.successMsg = "Room-Id is Not Valid"
    } else if(!this.isInput(this.RoomForm.value.name)) {
      this.successMsg = "Name is Not Valid"
    } else if(!this.isInput(this.RoomForm.value.description)) {
      this.successMsg = "Description is Not Valid"
    } else if(this.RoomForm.value.roomId === "") {
      this.successMsg = "Room-Id is Required"
    } else if(this.RoomForm.value.name === "") {
      this.successMsg = "Name is Required"
    } else if(this.RoomForm.value.description === "") {
      this.successMsg = "Description is Required"
    } else {
      this.successMsg = "Form is Not Valid"
    }
  }

  //Create User
  createUser(): void {
    if(this.isInput(this.UserForm.value.name) && this.isEmail(this.UserForm.value.email) && this.isPassword(this.UserForm.value.password, this.UserForm.value.password2) && this.UserForm.valid) {
      var user: CreateUser = {
        name: this.UserForm.value.name,
        email: this.UserForm.value.email,
        password: this.UserForm.value.password
      }
      this.userService.registerUser(user).subscribe({
        next: data => {
          this.successMsg = "Registration Successful"
        },
        error: error => {
          if(error['statusText'] == "Bad Request") {
            this.successMsg = "Email Already Exist"
          } else {
            this.successMsg = "User Not Created"
          }
        }
      });
    } else if(!this.isEmail(this.UserForm.value.email) && this.UserForm.value.password == "" && this.UserForm.value.password2 == "") {
      this.successMsg = "Email or Password Is Empty"
    } else if(!this.isEmail(this.UserForm.value.email)) {
      this.successMsg = "Email Is Not Valid"
    } else if(!this.isPassword(this.UserForm.value.password, this.UserForm.value.password2)) {
      this.successMsg = "Password Does Not Match or Password must be at least 6 Characters Long"
    } else if(this.UserForm.value.email == "" || this.UserForm.value.email == null || this.UserForm.value.email == undefined) {
      this.successMsg = "Email Is Required"
    } else if(this.UserForm.value.password == "" || this.UserForm.value.password == null || this.UserForm.value.password == undefined) {
      this.successMsg = "Password Is Required"
    } else if(this.UserForm.value.password.length < 6) {
      this.successMsg = "Password must be at least 6 Characters Long"
    } else if(this.UserForm.value.password2 == "" || this.UserForm.value.password2 == null || this.UserForm.value.password2 == undefined) {
      this.successMsg = "Confirm Password Is Required"
    } else if(this.UserForm.value.password2.length < 6) {
      this.successMsg = "Confirm Password must be at least 6 Characters Long"
    } else if(this.UserForm.value.name == "" || this.UserForm.value.name == null || this.UserForm.value.name == undefined) {
      this.successMsg = "Name Is Required"
    } else {
      this.successMsg = "Email Is Not Valid"
    }
  }

  isInput(name: string): Boolean {
    return (name != "" && name != null && name != undefined) ? true : false
  }

  isEmail(email: string): Boolean {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email)
  }

  isPassword(pass1: string, pass2: string): Boolean {
    return pass1 === pass2 && pass1.length >= 6 && pass2.length >= 6
  }

  isUrl(url: string): Boolean {
    var regexp = new RegExp(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/);
    return regexp.test(url)
  }

  isNumber(number: Number): Boolean {
    return (number > 0) ? true : false
  }


  logout() {
    this.jwtService.logout();
    this.router.navigateByUrl('/login');
  }

  openSnackBar(message: string) {
    this.snackbar.open(message);
  }
}
