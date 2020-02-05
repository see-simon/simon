package studentexamauth.backend.usercourse;

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
public class UserCourseController {
    @Autowired
    private UserCourseService userCourseService;

    @GetMapping("/userCourse")
    public List<UserCourse> getUserCourses() {
        return userCourseService.getUserCourses();
    }

    @GetMapping("/userCourse/course/{cid}")
    public List<UserCourse> getUserByCourse(@PathVariable int cid) {
        return userCourseService.getUserByCourse(cid);
    }

    @GetMapping("/userCourse/user/{uid}")
    public List<UserCourse> getCourseByUser(@PathVariable String uid) {
        return userCourseService.getCourseByUser(uid);
    }

    @GetMapping("/userCourse/{id}")
    public UserCourse getUserCourse(@PathVariable int id) {
        return userCourseService.getUserCourse(id);
    }

    @PostMapping("/userCourse")
    public void createUserCourse(@RequestBody UserCourse userCourse) {
        userCourseService.createUserCourse(userCourse);
    }

    @PutMapping("/userCourse")
    public void updateUserCourse(@RequestBody UserCourse userCourse) {
        userCourseService.updateUserCourse(userCourse);
    }

    @DeleteMapping("/userCourse")
    public void deleteUserCourses() {
        userCourseService.deleteUserCourses();
    }

    @DeleteMapping("/userCourse/{id}")
    public void deleteUserCourse(@PathVariable int id) {
        UserCourse userCourse = getUserCourse(id);
        userCourseService.deleteUserCourse(userCourse);
    }
}
