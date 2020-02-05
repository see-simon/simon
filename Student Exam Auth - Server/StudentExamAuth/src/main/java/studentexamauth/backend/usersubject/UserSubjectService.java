package studentexamauth.backend.usersubject;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserSubjectService {
    @Autowired
    private UserSubjectRepository userSubjectRepository;

    public List<UserSubject> getUserSubjects() {
        return userSubjectRepository.findAll();
    }

    public List<UserSubject> getUserBySubject(int sid) {
        return userSubjectRepository.findUserBySubject(sid);
    }

    public List<UserSubject> getSubjectByUser(String uid) {
        return userSubjectRepository.findSubjectByUser(uid);
    }

    public UserSubject getUserSubject(int id) {
        return userSubjectRepository.findById(id);
    }

    public void createUserSubject(UserSubject userSubject) {
        userSubjectRepository.save(userSubject);
    }

    public void updateUserSubject(UserSubject userSubject) {
        userSubjectRepository.saveAndFlush(userSubject);
    }

    public void deleteUserSubjects() {
        userSubjectRepository.deleteAll();
    }

    public void deleteUserSubject(UserSubject userSubject) {
        userSubjectRepository.delete(userSubject);
    }
}
