package studentexamauth.backend.exam;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamService {
	@Autowired
	private ExamRepository examRepository;
	
	public List<Exam> readExams() {
		return examRepository.findAll();
	}

	public Exam getExamsByFk(int sid) {
        return examRepository.findByFk(sid);
    }
	
	public Exam readExam(int id) {
		return examRepository.findById(id);
	}

	public void createExam(Exam exam) {
		examRepository.save(exam);
	}

	public void updateExam(Exam exam) {
		examRepository.saveAndFlush(exam);
	}

	public void deleteExams() {
		examRepository.deleteAll();
	}

	public void deleteExam(Exam exam) {
		examRepository.delete(exam);
	}
}
