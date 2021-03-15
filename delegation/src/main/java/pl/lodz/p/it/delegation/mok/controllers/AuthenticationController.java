package pl.lodz.p.it.delegation.mok.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.system.JavaVersion;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.SpringVersion;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.p.it.delegation.mod.model.Rate;
import pl.lodz.p.it.delegation.mod.repositories.RateRepository;
import pl.lodz.p.it.delegation.mod.singleton.RateSingleton;
import pl.lodz.p.it.delegation.mok.model.AuthResponse;
import pl.lodz.p.it.delegation.mok.model.AuthUser;
import pl.lodz.p.it.delegation.mok.security.JwtService;
import pl.lodz.p.it.delegation.mok.services.LoginDetailsService;

@CrossOrigin
@RestController
@AllArgsConstructor
@Slf4j
public class AuthenticationController {


    private final AuthenticationManager authManager;
    private final LoginDetailsService loginDetailsService;
    private final JwtService jwtService;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthUser authUser) {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(authUser.getEmail(), authUser.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Incorrect credentials.");
        }
        final UserDetails userDetails = loginDetailsService.loadUserByUsername(authUser.getEmail());
        final String jwt = jwtService.generateToken(userDetails);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new AuthResponse(jwt));
    }


}


