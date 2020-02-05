package studentexamauth.backend.exam;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Exam {
	@Id
	@GeneratedValue
	private int id;
	private String building;
	private int courseId;
	private Date date;
	private String room;
	private String semester;
	private String session;
	@Column(unique = true)
	private int subjectId;

	public Exam() {

	}

	public Exam(int id, String building, int courseId, Date date, String room, String semester, String session,
			int subjectId) {
		super();
		this.id = id;
		this.building = building;
		this.courseId = courseId;
		this.date = date;
		this.room = room;
		this.semester = semester;
		this.session = session;
		this.subjectId = subjectId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBuilding() {
		return building;
	}

	public void setBuilding(String building) {
		this.building = building;
	}

	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getRoom() {
		return room;
	}

	public void setRoom(String room) {
		this.room = room;
	}

	public String getSemester() {
		return semester;
	}

	public void setSemester(String semester) {
		this.semester = semester;
	}

	public String getSession() {
		return session;
	}

	public void setSession(String session) {
		this.session = session;
	}

	public int getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(int subjectId) {
		this.subjectId = subjectId;
	}
}
