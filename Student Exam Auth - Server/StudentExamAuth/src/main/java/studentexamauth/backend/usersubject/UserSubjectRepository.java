package studentexamauth.backend.usersubject;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserSubjectRepository extends JpaRepository<UserSubject, Integer>{
    UserSubject findById(int id);

    @Query("Select us from UserSubject us Where us.subjectId = :sid")
    List<UserSubject> findUserBySubject(int sid);

    @Query("Select us from UserSubject us Where us.userId = :uid")
    List<UserSubject> findSubjectByUser(String uid);
}
