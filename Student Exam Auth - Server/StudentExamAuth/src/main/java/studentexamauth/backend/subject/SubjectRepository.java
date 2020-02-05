package studentexamauth.backend.subject;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SubjectRepository extends JpaRepository<Subject, Integer>{
    Subject findById(int id);
    
    @Query("Select s from Subject s Where s.courseId = :cid")
    List<Subject> findByFk(int cid);
}
