package studentexamauth.backend.user;

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
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping("/user")
	public List<User> readUsers() {
		return userService.readUsers();
	}

	@GetMapping("/user/{id}")
	public User getUser(@PathVariable String id) {
		return userService.readUser(id);
	}

//	@GetMapping("/user/{username}/{password}")
//	public User signIn(@PathVariable String username, @PathVariable String password) {
//		return userService.signIn(username, password);
//	}

	@GetMapping("/user/finger/{print}")
	public User findFingerPrint(@PathVariable byte[] print) {
		return userService.findFingerPrint(print);
	}

	@PostMapping(value = "/user")
	public void createUser(@RequestBody User user) {
		userService.createUser(user);
	}

	@PutMapping(value = "/user")
	public void updateUser(@RequestBody User user) {
		userService.updateUser(user);
	}

	@DeleteMapping("/user")
	public void deleteUsers() {
		userService.deleteUers();
	}

	@DeleteMapping("/user/{id}")
	public void deleteUser(@PathVariable String id) {
		User user = userService.readUser(id);
		userService.deleteUser(user);
	}
}