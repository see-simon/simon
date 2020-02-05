import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../class/course';
import { Subject } from '../class/subject';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  courses: any;
  subjects: any;
  allSub: boolean = true;
  subj: boolean = false;
  cour: boolean = false;
  regCourse: boolean = false;
  regSubject = false;
  updateCour = false;
  updateSubj = false;
  tempCourse: any = null;
  tempSubject: any = null;
  constructor(private _service: AppService) { }

  ngOnInit() {
    this.getCourses();
    this.getSubjects();
  }

  headElements = ["No.", "Subject Name", "Subject Code"];
  headElements2 = ["No.", "Course Name", "Course Code", "Update", "Delete"];

  getCourses() {
    this._service.readCourse().subscribe(res => {
      this.courses = res;
    })
  }

  getSubjectsByCourse(cid: number) {
    this._service.readSubjectByCourse(cid).subscribe(res => {
    })
  }

  getSubjects() {
    this._service.readSubject().subscribe(res => {
      this.subjects = res;
    })
  }

  all(rec: boolean) {
    this.allSub = rec;
    this.subj = false;
    this.cour = false;
    this.regCourse = false;
    this.regSubject = false;
  }

  subject(rec: boolean) {
    this.getSubjects();
    this.subj = rec;
    this.allSub = false;
    this.cour = false;
    this.regCourse = false;
    this.regSubject = false;
  }

  course(rec: boolean) {
    this.cour = rec;
    this.allSub = false;
    this.subj = false;
    this.regCourse = false;
    this.regSubject = false;
  }

  registerCourse(rec: boolean) {
    this.regCourse = rec;
    this.cour = false;
    this.allSub = false;
    this.subj = false;
    this.regSubject = false;
  }

  registerSubject(rec: boolean) {
    this.regSubject = rec;
    this.regCourse = false;
    this.cour = false;
    this.allSub = false;
    this.subj = false;
  }

  rmvCourse(course: Course) {
    this._service.deleteCourse(course).subscribe(res => {
      this._service.readSubjectByCourse(course.id).subscribe(sub => {
        if (sub) {
          let subj: any = sub;
          subj.forEach(el => {
            this._service.deleteSubject(el).subscribe(delsub => {
              this._service.readUserBySubject(el.id).subscribe(us => {
                if (us) {
                  let userSubject: any = us;
                  userSubject.forEach(e => {
                    this._service.deleteUserSubject(e).subscribe(dus => {
                    });
                  });
                }
              });
            });
          });
        }
      });
      this._service.readUserByCourse(course.id).subscribe(uc => {
        if (uc) {
          let userCource: any = uc;
          userCource.forEach(e => {
            this._service.deleteUserCourse(e).subscribe(delUc => {
            });
          });
        }
      });
      this._service.deleteExams().subscribe(res => {
        alert("Course Removed!");
       })
      this.getCourses();
    });
  }

  rmvSubject(subject: Subject) {
    this._service.deleteSubject(subject).subscribe(res => {
      this._service.deleteExams().subscribe(res => { })
      this.getSubjects();
      alert("Subject Removed!");
    });
  }

  updSubject(s: Subject) {
    this.updateSubj = true;
    this.tempSubject = s;
  }

  updCourse(c: Course) {
    this.updateCour = true;
    this.tempCourse = c;
  }

  courseForm = new FormGroup({
    code: new FormControl(),
    name: new FormControl(),
  })

  subjectForm = new FormGroup({
    code: new FormControl(),
    name: new FormControl(),
  })

  updateCourse() {
    let course: Course = {
      code: this.courseForm.controls["code"].value,
      name: this.courseForm.controls["name"].value,
    }

    if (course.name != this.tempCourse.name && course.name) {
      this.tempCourse.name = course.name;
    }

    if (course.code != this.tempCourse.code && course.code) {
      this.tempCourse.code = course.code;
    }

    this._service.updateCourse(this.tempCourse).subscribe(res => {
      this.updateCour = false;
      this.tempCourse = null;
      alert("Course Updated!");
    })
  }
  updateSubject() {
    let subject: Subject = {
      code: this.subjectForm.controls["code"].value,
      name: this.subjectForm.controls["name"].value,
    }

    if (subject.name != this.tempSubject.name && subject.name) {
      this.tempSubject.name = subject.name;
    }

    if (subject.code != this.tempSubject.code && subject.code) {
      this.tempSubject.code = subject.code;
    }

    this._service.updateSubject(this.tempSubject).subscribe(res => {
      this.updateSubj = false;
      this.tempSubject = null;
      alert("Subject Updated!");
    })
  }
}
