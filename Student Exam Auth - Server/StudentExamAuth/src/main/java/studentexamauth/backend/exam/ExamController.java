package studentexamauth.backend.exam;

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
public class ExamController {
	@Autowired
	private ExamService examService;

	@GetMapping("/exam")
	public List<Exam> readExams() {
		return examService.readExams();
	}

	@GetMapping("/exam/fk/{sid}")
	public Exam getExamsByFk(@PathVariable int sid) {
		return examService.getExamsByFk(sid);
	}

	@GetMapping("/exam/{id}")
	public Exam getUser(@PathVariable int id) {
		return examService.readExam(id);
	}

	@PostMapping(value = "/exam")
	public void createExam(@RequestBody Exam exam) {
		examService.createExam(exam);
	}

	@PutMapping(value = "/exam")
	public void updateExam(@RequestBody Exam exam) {
		examService.updateExam(exam);
	}

	@DeleteMapping("/exam")
	public void deleteExams() {
		examService.deleteExams();
	}

	@DeleteMapping("/exam/{id}")
	public void deleteUser(@PathVariable int id) {
		Exam exam = examService.readExam(id);
		examService.deleteExam(exam);
	}
}
