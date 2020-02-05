package studentexamauth.backend.usercourse;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserCourseRepository extends JpaRepository<UserCourse, Integer> {
    UserCourse findById(int id);

    @Query("Select uc from UserCourse uc Where uc.courseId = :cid")
    List<UserCourse> findUserByCourse(int cid);

    @Query("Select uc from UserCourse uc Where uc.userId = :uid")
    List<UserCourse> findCourseByUser(String uid);
}
