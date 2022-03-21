package com.example.JokeApp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto {

    private UUID id;
    private String fullname;
    private String username;
    private String password;
    private String role;
    private String dateofbirth;
    private String address;
}
