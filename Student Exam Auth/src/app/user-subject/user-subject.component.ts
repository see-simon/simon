import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-subject',
  templateUrl: './user-subject.component.html',
  styleUrls: ['./user-subject.component.scss']
})
export class UserSubjectComponent implements OnInit {
  courses: any;
  userCourses: any;
  subjects: any;
  users: any;
  userSubject: any;
  elements: any = [];
  constructor(private _service: AppService) { }

  ngOnInit() {
    this.userSubjects();
  }

  getCourses() {
    this._service.readCourse().subscribe(res => {
      this.courses = res;
    })
  }

  getUserCourses() {
    this._service.readUserCourse().subscribe(res => {
      this.userCourses = res;
    })
  }

  getUserSubject() {
    this._service.readUserSubject().subscribe(res => {
      this.userSubject = res;
    })
  }

  getSubjects() {
    this._service.readSubject().subscribe(res => {
      this.subjects = res;
    })
  }

  getUsers() {
    this._service.getUsers().subscribe(res => {
      this.users = res;
    })
  }

  userSubjects() {
    this.getCourses();
    this.getUserCourses();
    this.getSubjects();
    this.getUsers();
    this.getUserSubject();
  }
}
