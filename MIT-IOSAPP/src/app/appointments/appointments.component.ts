import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  constructor(private service: AppointmentsService) { }

  appointments = [];

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.service.getAppointment().subscribe({
      next: data => {
        this.appointments = data['result'];
      },
    });
  }
}
