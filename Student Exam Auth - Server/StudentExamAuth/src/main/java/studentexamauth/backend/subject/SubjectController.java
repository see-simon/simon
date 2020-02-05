package studentexamauth.backend.subject;

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
public class SubjectController {
    @Autowired
    private SubjectService subjectService;

    @GetMapping("/subject")
    public List<Subject> getSubjects() {
        return subjectService.getSubjects();
    }

	@GetMapping("/subject/fk/{cid}")
	public List<Subject> getSubjectsByFk(@PathVariable int cid) {
		return subjectService.getSubjectsByFk(cid);
	}

    @GetMapping("/subject/{id}")
    public Subject getSubject(@PathVariable int id) {
        return subjectService.getSubject(id);
    }

    @PostMapping("/subject")
    public void createSubject(@RequestBody Subject subject) {
        subjectService.createSubject(subject);
    }

    @PutMapping("/subject")
    public void updateSubject(@RequestBody Subject Subject) {
        subjectService.updateSubject(Subject);
    }

    @DeleteMapping("/subject")
    public void deleteSubjects() {
        subjectService.deleteSubjects();
    }

    @DeleteMapping("/subject/{id}")
    public void deleteSubject(@PathVariable int id) {
        Subject subject = getSubject(id);
        subjectService.deleteSubject(subject);
    }
}
