package studentexamauth.backend.usercourse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserCourseService {
    @Autowired
    private UserCourseRepository userCourseRepository;

    public List<UserCourse> getUserCourses() {
        return userCourseRepository.findAll();
    }

    public List<UserCourse> getUserByCourse(int sid) {
        return userCourseRepository.findUserByCourse(sid);
    }

    public List<UserCourse> getCourseByUser(String uid) {
        return userCourseRepository.findCourseByUser(uid);
    }

    public UserCourse getUserCourse(int id) {
        return userCourseRepository.findById(id);
    }

    public void createUserCourse(UserCourse userCourse) {
        userCourseRepository.save(userCourse);
    }

    public void updateUserCourse(UserCourse userCourse) {
        userCourseRepository.saveAndFlush(userCourse);
    }

    public void deleteUserCourses() {
        userCourseRepository.deleteAll();
    }

    public void deleteUserCourse(UserCourse userCourse) {
        userCourseRepository.delete(userCourse);
    }
}
