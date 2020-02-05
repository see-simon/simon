package studentexamauth.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
@EnableAutoConfiguration
public class StudentExamAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentExamAuthApplication.class, args);
	}

}