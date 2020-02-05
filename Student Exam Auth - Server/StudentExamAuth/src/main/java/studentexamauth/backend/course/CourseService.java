package studentexamauth.backend.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getCourses() {
        return courseRepository.findAll();
    }

    // public List<Course> getCoursesByFk(String uid) {
    //     return courseRepository.findByFk(uid);
    // }

    public Course getCourse(int id) {
        return courseRepository.findById(id);
    }

    public void createCourse(Course course) {
        courseRepository.save(course);
    }

    public void updateCourse(Course course) {
        courseRepository.saveAndFlush(course);
    }

    public void deleteCourses() {
		courseRepository.deleteAll();
	}

	public void deleteCourse(Course course) {
		courseRepository.delete(course);
	}
}
