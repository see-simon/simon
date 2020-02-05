package studentexamauth.backend.subject;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubjectService {

    @Autowired 
    private SubjectRepository subjectRepository;

    public List<Subject> getSubjects() {
        return subjectRepository.findAll();
    }

    public List<Subject> getSubjectsByFk(int cid) {
        return subjectRepository.findByFk(cid);
    }

    public Subject getSubject(int id) {
        return subjectRepository.findById(id);
    }

    public void createSubject(Subject subject) {
        subjectRepository.save(subject);
    }

    public void updateSubject(Subject subject) {
        subjectRepository.saveAndFlush(subject);
    }

    public void deleteSubjects() {
		subjectRepository.deleteAll();
	}

	public void deleteSubject(Subject subject) {
		subjectRepository.delete(subject);
	}
}
