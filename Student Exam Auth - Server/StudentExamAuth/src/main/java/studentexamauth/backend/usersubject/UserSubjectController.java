package studentexamauth.backend.usersubject;

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
public class UserSubjectController {

    @Autowired
    private UserSubjectService userSubjectService;

    @GetMapping("/usersubject")
    public List<UserSubject> getUserSubjects() {
        return userSubjectService.getUserSubjects();
    }

    @GetMapping("/usersubject/subject/{sid}")
    public List<UserSubject> getUserBySubject(@PathVariable int sid) {
        return userSubjectService.getUserBySubject(sid);
    }

    @GetMapping("/usersubject/user/{uid}")
    public List<UserSubject> getSubjectByUser(@PathVariable String uid) {
        return userSubjectService.getSubjectByUser(uid);
    }

    @GetMapping("/usersubject/{id}")
    public UserSubject getUserSubject(@PathVariable int id) {
        return userSubjectService.getUserSubject(id);
    }

    @PostMapping("/usersubject")
    public void createUserSubject(@RequestBody UserSubject usersubject) {
        userSubjectService.createUserSubject(usersubject);
    }

    @PutMapping("/usersubject")
    public void updateUserSubject(@RequestBody UserSubject usersubject) {
        userSubjectService.updateUserSubject(usersubject);
    }

    @DeleteMapping("/usersubject")
    public void deleteUserSubjects() {
        userSubjectService.deleteUserSubjects();
    }

    @DeleteMapping("/usersubject/{id}")
    public void deleteUserSubject(@PathVariable int id) {
        UserSubject usersubject = getUserSubject(id);
        userSubjectService.deleteUserSubject(usersubject);
    }
}
