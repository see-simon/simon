import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../class/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  date: Date = new Date();
  edit: boolean = false;
  maxDate: string = "";
  pic: string = "/assets/pp.jpg";
  constructor(private _service: AppService, private _datePipe: DatePipe) { }

  ngOnInit() {
    this.user = this._service.getUserSession();
    if (this.user.photo) {
      this.pic = "data:image/png;base64," + this.user.photo;
    }
    this.date.setFullYear(this.date.getFullYear() - 17);
    this.date.setDate(31);
    this.date.setMonth(12);
    this.maxDate = this._datePipe.transform(this.date, "yyyy-MM-dd");
  }

  editProfile() {
    this.edit = true;
  }

  usr = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    dateOfBirth: new FormControl(''),
    contact: new FormControl(''),
  })

  update() {
    let user: User = {
      name: this.usr.controls['name'].value,
      surname: this.usr.controls['surname'].value,
      email: this.usr.controls['email'].value,
      contact: this.usr.controls['contact'].value,
      dateOfBirth: this.usr.controls['dateOfBirth'].value,
    }

    if (user.name != this.user.name && user.name != "") {
      this.user.name = user.name;
    }
    if (user.surname != this.user.surname && user.surname != "") {
      this.user.surname = user.surname;
    }
    if (user.email != this.user.email && user.email != "") {
      this.user.email = user.email;
    }
    if (user.contact != this.user.contact && user.contact != "") {
      this.user.contact = user.contact;
    }
    if (user.dateOfBirth) {
      this.user.dateOfBirth = user.dateOfBirth;
    }

    this._service.updateUser(this.user).subscribe(res => {
      this._service.setUserSession(this.user);
      alert("Update Successful!")
      this.edit = false;
    })
  }

  uploadFile(event) {
    let file = event.target.files[0];
    let fr = new FileReader();
    fr.onload = (event: any) => {
      let base64 = event.target.result;
      this.user.photo = base64.split(',')[1];
      this._service.updateUser(this.user).subscribe(res => {
        this._service.setUserSession(this.user);
        this.pic = base64;
      });
    }
    fr.readAsDataURL(file);
  }
}
