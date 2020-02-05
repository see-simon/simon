package studentexamauth.backend.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin()
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping("/course")
    public List<Course> getCourses() {
        return courseService.getCourses();
    }

    // @GetMapping("/course/fk/{uid}")
    // public List<Course> getCoursesByFk(@PathVariable String uid) {
    //     return courseService.getCoursesByFk(uid);
    // }

    @GetMapping("/course/{id}")
    public Course getCourse(@PathVariable int id) {
        return courseService.getCourse(id);
    }

    @PostMapping("/course")
    public void createCourse(@RequestBody Course course) {
        courseService.createCourse(course);
    }

    @PutMapping("/course")
    public void updateCourse(@RequestBody Course course) {
        courseService.updateCourse(course);
    }

    @DeleteMapping("/course")
    public void deleteCourses() {
        courseService.deleteCourses();
    }

    @DeleteMapping("/course/{id}")
    public void deleteCourse(@PathVariable int id) {
        Course course = getCourse(id);
        courseService.deleteCourse(course);
    }
}
