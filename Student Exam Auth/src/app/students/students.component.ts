import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from './../class/user';
import { AppService } from './../app.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserCourse } from '../class/user-course';
import { Usersubject } from '../class/usersubject';
import { Subject } from '../class/subject';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, DoCheck {
  users: any;
  edit: boolean = false;
  add: boolean = false;
  tempUser: User;
  staff: string = "Staff";
  student: string = "Student";
  courses: any;
  subjects: any;
  tempCourse: any;
  predicate: number = 0;
  addSubj: boolean = false;
  tempSubj: any = [];

  ngDoCheck() {
    this.predicate = this.subject.controls["predicate"].value;
  }
  val = 0;
  constructor(private _service: AppService, private _router: Router) { }

  ngOnInit() {
    this._service.getUsers().subscribe(res => {
      this.users = res;
    })
    this.getCourses();
    this.getSubjects();
  }

  headElements = ["No.", "Student no.", "Name", "Surname", "Email", "Date Registered", "Role", "Add Subjects", "Update", "Activate/Deactivate Account"];

  delete(user: User) {
    if (user.active) {
      user.active = false;
      alert(user.id + " has been diactivated!");
      this._service.readCourseByUser(user.id).subscribe(res => {
        let cu: any = res;
        cu.forEach(element => {
          element.active = false;
          this._service.updateUserCourse(element).subscribe(res => { });
        });
      });
      this._service.readSubjectByUser(user.id).subscribe(res => {
        let su: any = res;
        su.forEach(element => {
          element.active = false;
          this._service.updateUserSubject(element).subscribe(res => { });
        });
      });
    } else {
      user.active = true;
      alert(user.id + " has been activated!")
      this._service.readCourseByUser(user.id).subscribe(res => {
        let cu: any = res;
        cu.forEach(element => {
          element.active = true;
          this._service.updateUserCourse(element).subscribe(res => { });
        });
      });
      this._service.readSubjectByUser(user.id).subscribe(res => {
        let su: any = res;
        su.forEach(element => {
          element.active = true;
          this._service.updateUserSubject(element).subscribe(res => { });
        });
      });
    }

    this._service.updateUser(user).subscribe(res => {
      let usr = this._service.getUserSession();
      if (usr.id == user.id && !user.active) {
        this._service.removeUserSession();
        this._router.navigate(["/home"]);
      }
      this._service.getUsers().subscribe(res2 => {
        this.users = res2;
      });
    });
  }

  deleteAll() {
    this._service.deleteUsers().subscribe(res => {
      this._service.removeUserSession();
      this._router.navigate(["/home"]);
      this._service.getUsers().subscribe(res2 => {
        this.users = res2;
      })
    })
  }

  user = new FormGroup({
    name: new FormControl,
    surname: new FormControl,
    role: new FormControl(),
    email: new FormControl(),
    contact: new FormControl(),
  })

  showForm(user: User) {
    this.edit = true;
    this.tempUser = user;
  }

  hideForm() {
    this.addSubj = false;
  }

  addUser() {
    this.add = true;
  }

  addSub(user: User) {
    this._service.readUserCourse().subscribe(res => {
      let dontAddSubj: boolean = false;
      let userCourses: any = res;
      for (let i = 0; i < Object.keys(userCourses).length; i++) {
        if (userCourses[i].userId == user.id) {
          dontAddSubj = true;
          alert("Subjects already added!")
          break;
        }
      }
      if (!dontAddSubj || userCourses == null) {
        this.tempUser = user;
        this.addSubj = true;
        console.log("Data can't be added")
      }
    })
  }

  update() {
    if (this.tempUser.name != this.user.controls["name"].value && this.user.controls["name"].value) {
      this.tempUser.name = this.user.controls["name"].value;
    }
    if (this.tempUser.surname != this.user.controls["surname"].value && this.user.controls["surname"].value) {
      this.tempUser.surname = this.user.controls["surname"].value;
    }
    if (this.tempUser.role != this.user.controls["role"].value && this.user.controls["role"].value) {
      this.tempUser.role = this.user.controls["role"].value;
    }
    if (this.tempUser.email != this.user.controls["email"].value && this.user.controls["email"].value) {
      this.tempUser.email = this.user.controls["email"].value;
    }
    if (this.tempUser.contact != this.user.controls["contact"].value && this.user.controls["contact"].value) {
      this.tempUser.contact = this.user.controls["contact"].value;
    }

    this._service.updateUser(this.tempUser).subscribe(res => {
      this.tempUser = {};
      this._router.navigate(["/home"]).then(res => {
        alert("Update successful!")
        this._router.navigate(["/students"])
      })
    })
  }

  getCourses() {
    this._service.readCourse().subscribe(res => {
      this.courses = res;
    })
  }

  getSubjects() {
    this._service.readSubject().subscribe(res => {
      this.subjects = res;
    })
  }

  selecteCourse(event: Event) {
    let ev: any = event;
    this.tempCourse = this.courses[ev.target.selectedIndex - 1];
  }

  subject = new FormGroup({
    predicate: new FormControl(0),
  })

  range(event, s) {
    s.temp = event.target.value;
  }

  addSubject(s: Subject) {
    this._service.readUserCourse().subscribe(res => {
      let course: boolean = false;
      let userCourses: any = res;
      for (let i = 0; i < Object.keys(userCourses).length; i++) {
        if (userCourses[i].userId == this.tempUser.id) {
          course = true;
          break;
        }
      }
      if (!course) {
        let userCourse: UserCourse = {
          courseId: this.tempCourse.id,
          userId: this.tempUser.id,
          active: true
        }
        this._service.createUserCourse(userCourse).subscribe(res => { });
      }
    })

    let userSubject: Usersubject = {
      subjectId: s.id,
      userId: this.tempUser.id,
      predicate: s.temp,
      active: true
    }

    this.tempSubj.push(userSubject);
    this.subjects.splice(this.subjects.indexOf(s), 1);
  }

  save() {
    this.tempSubj.forEach(ele => {
      this._service.createUserSubject(ele).subscribe(res => {
        this.tempCourse = "";
      });
    });
    this.hideForm();
    this.getSubjects();
    this._router.navigate(["/staff"]).then(val => { this._router.navigate(["/students"]) })
  }

  downloadCSV(data: any) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], { type: 'text/csv' }),
      url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "Students.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  downloadTXT(data: any) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], { type: 'text/txt' }),
      url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "Students.txt";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  downloadDOC(data: any) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], { type: 'text/doc' }),
      url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "Students.doc";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  downloadPDF(data: any) {
    var doc = new jsPDF();
    var col = ["Student no.", "Name", "Surname", "Gender", "Email", "Contact", "Date Registed", "Role"];
    var rows = [];
    data.forEach(element => {
      var temp = [element.id, element.name, element.surname, element.gender, element.email, element.contact, element.regDate, element.role];
      rows.push(temp);
    });
    doc.autoTable(col, rows);
    doc.save('Students.pdf');
  }
}
