package studentexamauth.backend.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public List<User> readUsers() {
		return userRepository.findAll();
	}

	public User readUser(String id) {
		return userRepository.findById(id);
	}

	public void createUser(User user) {
		userRepository.save(user);
	}

	public void updateUser(User user) {
		userRepository.saveAndFlush(user);
	}

//	public User signIn(String username, String password) {
//		List<User> users = readUsers();
//		User user = null;
//		for (int i = 0; i < users.size(); i++) {
//			if (username.equals(users.get(i).id) && password.equals(users.get(i).password)) {
//				user = users.get(i);
//				break;
//			}
//		}
//		return user;
//	}

	public void deleteUers() {
		userRepository.deleteAll();
	}

	public void deleteUser(User user) {
		userRepository.delete(user);
	}

	public User findFingerPrint(byte[] fingerPrint) {
		return userRepository.findByFingerPrint(fingerPrint);
	}
}
