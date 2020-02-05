import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  err: any = false;
  constructor(private _service: AppService, private _router: Router) { }

  ngOnInit() {
  }

  login = new FormGroup({
    username: new FormControl('')
  })

  signin() {
    this.err = false;
    this._service.readUser(this.login.controls["username"].value).subscribe(res => {
      let user: any = res;

      if (user && user.active) {
        this._service.setUserSession(res);
        this._router.navigate([user.role.toLowerCase()]);
      } else if (this.login.controls['username'].value == "") {
        this.err = "Please fill in empty filed!";
      } else if (!this.login.controls['username'].valid) {
        this.err = "Invalid student number!";
      } else if (user && !user.active) {
        this.err = "Student no " + this.login.controls["username"].value + " has been deactivated please contact the exam department!";
      } else {
        this.err = "Student number does not exist!";
      }
    });
  }
}
