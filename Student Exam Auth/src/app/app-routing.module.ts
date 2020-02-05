import { ExamComponent } from './exam/exam.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { StudentComponent } from './student/student.component';
import { StaffComponent } from './staff/staff.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentsComponent } from './students/students.component';
import { SubjectComponent } from './subject/subject.component';
import { UserSubjectComponent } from './user-subject/user-subject.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: "signin", component: SigninComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent },
  { path: "staff", component: StaffComponent },
  { path: "student", component: StudentComponent },
  { path: "profile", component: ProfileComponent },
  { path: "students", component: StudentsComponent },
  { path: "exam", component: ExamComponent },
  { path: "subject", component: SubjectComponent },
  { path: "usersubject", component: UserSubjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
