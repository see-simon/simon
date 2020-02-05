import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  staff: string = "Staff";
  student: string = "Student";
  role: string = null;
  user: any;

  constructor(private _router: Router, private _service: AppService) { }

  ngOnInit() {
    if (this._service.getUserSession()) {
      this.user = this._service.getUserSession();
      if (this.user.role == this.staff) {
        this.role = this.staff;
      } else {
        if (this.user.role = this.student) {
          this.role = this.student;
        }
      }
    }
  }

  logOut() {
    this._service.removeUserSession();
    this._router.navigate(["/home"]);
    this.role = null;
  }
}
