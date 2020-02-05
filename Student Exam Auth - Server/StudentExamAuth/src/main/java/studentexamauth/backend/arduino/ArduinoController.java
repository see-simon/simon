package studentexamauth.backend.arduino;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin()
public class ArduinoController {
	@Autowired
	private ArduinoService arduinoService;

	@PostMapping(value = "/arduino")
	public void add(@RequestBody Arduino arduino) {
		arduinoService.add(arduino);
	}

	@GetMapping("/arduino")
	public List<Arduino> get() {
		return arduinoService.get();
	}

	@DeleteMapping("/arduino")
	public void deleteAll() {
		arduinoService.deleteAll();
	}

	@DeleteMapping(value = "/arduino/{id}")
	public void delete(@PathVariable int id) {
		arduinoService.delete(id);
	}
}
