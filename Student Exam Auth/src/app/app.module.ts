import { AppService } from './app.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { StaffComponent } from './staff/staff.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamComponent } from './exam/exam.component';
import { StudentsComponent } from './students/students.component';
import { SubjectComponent } from './subject/subject.component';
import { DatesComponent } from './exam/dates/dates.component';
import { AddSubjectComponent } from './subject/add-subject/add-subject.component';
import { CourseComponent } from './subject/course/course.component';
import { UserExamComponent } from './user-exam/user-exam.component';
import { UserSubjectComponent } from './user-subject/user-subject.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SigninComponent,
    NavbarComponent,
    HomeComponent,
    StudentComponent,
    StaffComponent,
    ProfileComponent,
    ExamComponent,
    StudentsComponent,
    SubjectComponent,
    DatesComponent,
    AddSubjectComponent,
    CourseComponent,
    UserExamComponent,
    UserSubjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
  ],
  providers: [AppService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
