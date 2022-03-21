package com.example.JokeApp.service;

import com.example.JokeApp.dto.ClientDto;
import com.example.JokeApp.mapper.ClientMapper;
import com.example.JokeApp.model.Account;
import com.example.JokeApp.model.security.Erole;
import com.example.JokeApp.model.security.Role;
import com.example.JokeApp.repository.AccountRepository;
import com.example.JokeApp.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service for managing client accounts.
 */
@Service
@RequiredArgsConstructor
public class ClientService {

    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final ClientMapper clientMapper;
    private final PasswordEncoder passwordEncoder;

    public List<ClientDto> fetchAll() {
        return accountRepository.findAll().stream()
                .map(clientMapper::toDto)
                .peek(e -> e.setPassword(""))
                .collect(Collectors.toList());
    }

    public ClientDto fetchById(UUID id) {
        return clientMapper.toDto(accountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client not found")));
    }

    public ClientDto fetchByUsername(String username) {
        return clientMapper.toDto(accountRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Client not found")));
    }

    public ClientDto modify(ClientDto clientDto) {
        Account client = accountRepository.findById(clientDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Unable to find client "));
        client.setAddress(clientDto.getAddress());
        client.setDateofbirth(ClientMapper.mapStringtoDate(clientDto.getDateofbirth()));
        client.setFullname(clientDto.getFullname());
        client.setRole(roleRepository.findByName(Erole.valueOf(clientDto.getRole())));
        if (!clientDto.getPassword().equals("")) {
            client.setPassword(passwordEncoder.encode(clientDto.getPassword()));
        }
        if (!clientDto.getUsername().equals(client.getUsername()) && accountRepository.existsByUsername(
                clientDto.getUsername()))
            throw new EntityExistsException("Username already exists");
        client.setUsername(clientDto.getUsername());
        return clientMapper.toDto(accountRepository.save(client));
    }

    public ClientDto createClient(ClientDto clientDto) {
        Account client = clientMapper.fromDto(clientDto);
        client.setId(null);
        if (accountRepository.existsByUsername(clientDto.getUsername()))
            throw new EntityExistsException("Username already exists");
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        client.setRole(roleRepository.findByName(client.getRole().getName()));
        return clientMapper.toDto(accountRepository.save(client));
    }

    public List<ClientDto> fetchByRole(String roleName) {
        Role role = roleRepository.findByName(Erole.valueOf(roleName));
        return accountRepository.findAllByRole(role).stream()
                .map(clientMapper::toDto)
                .collect(Collectors.toList());
    }

    public void deleteById(UUID id) {
        accountRepository.deleteById(id);
    }
}
