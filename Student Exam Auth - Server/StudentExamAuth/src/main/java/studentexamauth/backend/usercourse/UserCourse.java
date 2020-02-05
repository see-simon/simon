package studentexamauth.backend.usercourse;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class UserCourse {
	@Id
	@GeneratedValue
	private int id;
	private String userId;
	private int courseId;
	boolean active;

	public UserCourse(int id, String userId, int courseId, boolean active) {
		super();
		this.id = id;
		this.userId = userId;
		this.courseId = courseId;
		this.active = active;
	}

	public UserCourse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
