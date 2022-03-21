package com.example.JokeApp.controller;

import com.example.JokeApp.UrlEncoder;
import com.example.JokeApp.dto.LoginRequest;
import com.example.JokeApp.dto.LoginResponse;
import com.example.JokeApp.dto.MessageResponse;
import com.example.JokeApp.dto.RegisterRequest;
import com.example.JokeApp.model.security.UserDetailsImpl;
import com.example.JokeApp.service.JwtService;
import com.example.JokeApp.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(UrlEncoder.AUTH_PATH)
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RegistrationService registrationService;

    @PostMapping(UrlEncoder.SIGN_IN)
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                        loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()).get(0);
        return ResponseEntity.ok(LoginResponse.builder()
                .username(userDetails.getUsername())
                .role(role)
                .token(jwtService.generateJwt(authentication))
                .build());
    }

    @PostMapping(UrlEncoder.REGISTER)
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (registrationService.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("An account already exists with this username"));
        }
        registrationService.register(registerRequest);
        return ResponseEntity
                .ok()
                .body(new MessageResponse("Successfully registered"));
    }
}
