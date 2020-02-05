import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../class/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // finger: any = null;
  finger: Blob;
  scanned: boolean = false;
  err: any = false;
  err1: any = false;
  err2: any = false;
  err3: any = false;
  err4: any = false;
  err5: any = false;
  err6: any = false;
  constructor(private _service: AppService, private _router: Router) {
    _service.removeFirebaseSignUp();
  }

  ngOnInit() {
    // this._service.listFirebaseSignUp().valueChanges().subscribe(res => {
    //   if (res.length == 0) {
    //     this.scanned = false;
    //   } else {
    //     this.scanned = true;
    //     this.finger = res[0];
    //   }
    // });
  }

  user = new FormGroup({
    studNum: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    gender: new FormControl('Select gender'),
    email: new FormControl(''),
    contact: new FormControl(''),
    image: new FormControl(''),
  })

  uploadFile(event) {
    let file = event.target.files[0];
    let fr = new FileReader();
    fr.onload = (event: any) => {
      let base64 = event.target.result;
      this.finger = base64.split(',')[1];
      this.scanned = true;
    }
    fr.readAsDataURL(file);
  }

  register() {
    this.err = false;
    this.err1 = false;
    this.err2 = false;
    this.err3 = false;
    this.err4 = false;
    this.err5 = false;
    let user: User = {
      id: this.user.controls['studNum'].value,
      name: this.user.controls['name'].value,
      surname: this.user.controls['surname'].value,
      email: this.user.controls['email'].value,
      contact: this.user.controls['contact'].value,
      role: "Student",
      gender: this.user.controls['gender'].value,
      fingerPrint: this.finger,
      active: true,
      regDate: new Date(),
    }
    this._service.readUser(user.id).subscribe(val => {
      if (!val) {
        if (user.id == "" || user.name == "" || user.surname == "" || user.email == "" || user.contact == "" || this.user.controls['gender'].value == "Select gender") {
          this.err = "Please fill in empty fileds!";
        } else {
          if (!this.user.controls['studNum'].valid) {
            this.err1 = "Invalid student number";
          } else if (!this.user.controls['name'].valid) {
            this.err2 = "Invalid name";
          } else if (!this.user.controls['surname'].valid) {
            this.err3 = "Invalid surname";
          } else if (!this.user.controls['email'].valid) {
            this.err4 = "Invalid e-mail";
          } else if (!this.user.controls['contact'].valid) {
            this.err5 = "Invalid contact number";
            // } else if (!this.scanned) {
            //this.err6 = "Finger print not scanned!";
          } else {
            this._service.getUser(user.fingerPrint).subscribe(response => {
              if (!response) {
                this._service.createUser(user).subscribe(res => {
                  this._service.setUserSession(user);
                  this._router.navigate(["/home"]).then(re => {
                    this._router.navigate([user.role.toLowerCase()]);
                  });
                });
              } else {
                alert("Finger print already registed!\nPlease contact the exam department.");
              }
            });
          }
        }
      } else {
        alert("User with student number " + user.id + " exist!\nPlease login.");
        this._router.navigate(["/signin"]);
      }
    })
  }
}
