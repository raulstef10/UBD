package com.example.JokeApp.service;

import com.example.JokeApp.dto.RegisterRequest;
import com.example.JokeApp.model.Account;
import com.example.JokeApp.model.security.Erole;
import com.example.JokeApp.repository.AccountRepository;
import com.example.JokeApp.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean existsByUsername(String username) {
        return accountRepository.existsByUsername(username);
    }

    public void register(RegisterRequest registerRequest) {
        Account account = Account.builder()
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .address(registerRequest.getAddress())
                .fullname(registerRequest.getFullname())
                .dateofbirth(Date.valueOf(registerRequest.getDateofbirth()))
                .role(roleRepository.findByName(Erole.CLIENT))
                .build();
        accountRepository.save(account);
    }
}
