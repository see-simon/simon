package studentexamauth.backend.exam;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExamRepository extends JpaRepository<Exam, Integer> {
	Exam findById(int id);

	@Query("Select e from Exam e Where e.subjectId = :sid")
	Exam findByFk(int sid);
}
