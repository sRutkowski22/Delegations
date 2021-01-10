package pl.lodz.p.it.delegation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;

@SpringBootApplication
public class DelegationApplication {

	public static void main(String[] args) {
		SpringApplication.run(DelegationApplication.class, args);
	}

}
