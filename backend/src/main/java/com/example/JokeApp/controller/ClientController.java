package com.example.JokeApp.controller;

import com.example.JokeApp.UrlEncoder;
import com.example.JokeApp.dto.ClientDto;
import com.example.JokeApp.dto.MessageResponse;
import com.example.JokeApp.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(originPatterns = "*", maxAge = 3600)
@RestController
@RequestMapping(UrlEncoder.CLIENT_PATH)
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    public List<ClientDto> fetchAll() {
        return clientService.fetchAll();
    }

    @GetMapping(UrlEncoder.ID_PATH)
    public ClientDto fetchById(@PathVariable UUID id) {
        return clientService.fetchById(id);
    }

    @GetMapping(UrlEncoder.FIND_BY_USERNAME + UrlEncoder.USERNAME_PATH)
    public ClientDto fetchById(@PathVariable String username) {
        return clientService.fetchByUsername(username);
    }

    @GetMapping(UrlEncoder.FIND_BY_ROLE + UrlEncoder.ROLE_PATH)
    public List<ClientDto> fetchByCategory(@PathVariable String role) {
        return clientService.fetchByRole(role);
    }

    @DeleteMapping(UrlEncoder.ID_PATH)
    public void deleteById(@PathVariable UUID id) {
        clientService.deleteById(id);
    }

    @PutMapping
    public ResponseEntity<?> alterClient(@RequestBody ClientDto clientDto) {
        try {
            return ResponseEntity.ok(clientService.modify(clientDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createClient(@RequestBody ClientDto clientDto) {
        try {
            return ResponseEntity.ok(clientService.createClient(clientDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}
