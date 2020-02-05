import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/class/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courses: any;
  constructor(private _service: AppService, private _router: Router) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this._service.readCourse().subscribe(res => {
      this.courses = res;
    })
  }

  course = new FormGroup({
    code: new FormControl,
    name: new FormControl,
  })

  save() {
    let course: Course = {
      code: this.course.controls["code"].value,
      name: this.course.controls["name"].value,
    }
    let co: boolean = false;

    for (let i = 0; i < Object.keys(this.courses).length; i++) {
      if (this.courses[i].code == course.code || course.name == this.courses.name) {
        co = true;
        break;
      }
    }
    if (!co) {
      this._service.createCourse(course).subscribe(res => {
        this._router.navigate(["/staff"]).then(res => {
          alert("Course Added!");
          this._router.navigate(["/subject"]);
        });
      })
    }
  }
}
