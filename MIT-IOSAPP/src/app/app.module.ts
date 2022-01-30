import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RoomsComponent } from './rooms/rooms.component';
import { LoginComponent } from './login/login.component';
import { InternationalComponent } from './international/international.component';
import { AdminComponent } from './admin/admin.component';
import { EventsComponent } from './events/events.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { InternalinfoComponent } from './internalinfo/internalinfo.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { JwtGuard } from './jwt.guard';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { I18nModule } from './i18n/i18n.module';
import { NominatimService } from './nominatim.service';
// Material Components
import { MatTableModule } from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import  {MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import "leaflet/dist/leaflet.css";
import { GeocodingComponent } from './navigation/geocoding/geocoding.component';
import { ResultsListComponent } from './navigation/results-list/results-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavigationComponent,
    RoomsComponent,
    LoginComponent,
    AdminComponent,
    EventsComponent,
    RegisterComponent,
    UserComponent,
    InternalinfoComponent,
    InternationalComponent,
    AppointmentsComponent,
    GeocodingComponent,
    ResultsListComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'navigation', component: NavigationComponent },
      { path: 'events', component: EventsComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'international', component: InternationalComponent },
      { path: 'admin', component: AdminComponent, canActivate: [JwtGuard] },
      { path: 'user', component: UserComponent, canActivate: [JwtGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'internalinfo', component: InternalinfoComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'register', component: RegisterComponent },
    ]),
    FlexLayoutModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    LeafletModule,
    BrowserAnimationsModule,
    I18nModule],
  exports: [
    RouterModule,
  ],
  entryComponents: [LoginComponent],
  providers: [MatDatepickerModule, MatNativeDateModule, NominatimService ], // SocketioService
  bootstrap: [AppComponent]
})
export class AppModule { }
