package studentexamauth.backend.usersubject;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class UserSubject {
	@Id
	@GeneratedValue
	private int id;
	private String userId;
	private int subjectId;
	private int predicate;
	boolean active;

	public UserSubject() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserSubject(int id, String userId, int subjectId, int predicate, boolean active) {
		super();
		this.id = id;
		this.userId = userId;
		this.subjectId = subjectId;
		this.predicate = predicate;
		this.active = active;
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

	public int getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(int subjectId) {
		this.subjectId = subjectId;
	}

	public int getPredicate() {
		return predicate;
	}

	public void setPredicate(int predicate) {
		this.predicate = predicate;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
