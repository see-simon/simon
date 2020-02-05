package studentexamauth.backend.arduino;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ArduinoService {

    public List<Arduino> arduino = new ArrayList<>();

	public int add(Arduino arduinoData) {
		arduino.add(arduinoData);
		return arduino.size();
	}
	
	public List<Arduino> get(){
		return arduino;
	}
	
	public void deleteAll() {
		arduino.removeAll(arduino);
	}
	
	public void delete(int id) {
		arduino.remove(id);
	}
}
