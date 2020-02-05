import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from './../../class/subject';
import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
  courses: any;
  subjects: any;
  constructor(private _service: AppService, private _router: Router) { }

  ngOnInit() {
    this.getCourses();
    this.getSubjects();
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

  subject = new FormGroup({
    courseId: new FormControl,
    name: new FormControl,
    code: new FormControl,
  })

  save() {
    let subject: Subject = {
      courseId: this.subject.controls["courseId"].value,
      name: this.subject.controls["name"].value,
      code: this.subject.controls["code"].value,
      temp: 0,
    }

    let subj: boolean = false;
    for (let i = 0; i < Object.keys(this.subjects).length; i++) {
      if (this.subjects[i].courseId == subject.courseId && this.subjects[i].code == subject.code) {
        subj = true;
        break;
      }
    }

    if (!subj) {
      this._service.createSubject(subject).subscribe(res => {
        this._router.navigate(["/staff"]).then(res => {
          alert("Subject Added!");
          this._router.navigate(["/subject"]);
        });
      })
    }
  }
}
