package com.example.JokeApp.controller;

import com.example.JokeApp.UrlEncoder;
import com.example.JokeApp.dto.JokeDto;
import com.example.JokeApp.service.JokeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(originPatterns = "*", maxAge = 3600)
@RestController
@RequestMapping(UrlEncoder.JOKE_PATH)
@RequiredArgsConstructor
public class JokeController {

    private final JokeService jokeService;

    @GetMapping
    public List<JokeDto> fetchAll() {
        return jokeService.fetchAll();
    }

    @GetMapping(UrlEncoder.ID_PATH)
    public JokeDto findById(@PathVariable UUID id) {
        return jokeService.fetchById(id);
    }

    @GetMapping(UrlEncoder.FIND_BY_OWNER + UrlEncoder.ID_PATH)
    public List<JokeDto> fetchByOwner(@PathVariable String id) {
        return jokeService.fetchByWriter(id);
    }

    @GetMapping(UrlEncoder.FIND_BY_CATEGORY + UrlEncoder.CATEGORY_PATH)
    public List<JokeDto> fetchByCategory(@PathVariable String category) {
        return jokeService.fetchByCategory(category);
    }

    @PostMapping
    public JokeDto createJoke(@RequestBody JokeDto jokeDto) {
        return jokeService.create(jokeDto);
    }

    @PutMapping
    public JokeDto editJoke(@RequestBody JokeDto jokeDto) {
        return jokeService.modify(jokeDto);
    }

    @DeleteMapping(UrlEncoder.ID_PATH)
    public void deleteJoke(@PathVariable UUID id) {
        jokeService.delete(id);
    }
}
