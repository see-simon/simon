package studentexamauth.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findById(String id);

	User findByFingerPrint(byte[] fingerPrint);
}
