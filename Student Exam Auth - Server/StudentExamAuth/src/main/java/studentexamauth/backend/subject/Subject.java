package studentexamauth.backend.subject;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Subject {
    @Id
    @GeneratedValue
    private int id;
    private int courseId;
    private String name;
    private String code;
    private int temp;

    public Subject() {

    }

    public Subject(int id, int courseId, String name, String code, int temp) {
        this.id = id;
        this.courseId = courseId;
        this.name = name;
        this.code = code;
        this.temp =temp;
    }

    public int getTemp() {
		return temp;
	}

	public void setTemp(int temp) {
		this.temp = temp;
	}

	public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
