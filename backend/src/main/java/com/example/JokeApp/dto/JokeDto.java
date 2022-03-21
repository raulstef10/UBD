package com.example.JokeApp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JokeDto {

    private UUID id;
    private String title;
    private String writer;
    private String description;
    private String category;
}
