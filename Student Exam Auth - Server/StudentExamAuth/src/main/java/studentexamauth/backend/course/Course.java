package studentexamauth.backend.course;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Course {
    @Id
    @GeneratedValue
    private int id;
    private String code;
    private String name;
	boolean active;
	
	public Course() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Course(int id, String code, String name, boolean active) {
		super();
		this.id = id;
		this.code = code;
		this.name = name;
		this.active = active;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}