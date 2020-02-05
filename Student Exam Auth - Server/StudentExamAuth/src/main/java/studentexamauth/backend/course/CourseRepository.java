package studentexamauth.backend.course;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer>{
    Course findById(int id);
    
    // @Query("Select c from Course c Where c.userid = :uid")
	// List<Course> findByFk(String uid);
}
