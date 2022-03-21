package com.example.JokeApp.service;

import com.example.JokeApp.dto.JokeDto;
import com.example.JokeApp.mapper.JokeMapper;
import com.example.JokeApp.model.Account;
import com.example.JokeApp.model.Category;
import com.example.JokeApp.model.Ecategory;
import com.example.JokeApp.model.Joke;
import com.example.JokeApp.repository.AccountRepository;
import com.example.JokeApp.repository.CategoryRepository;
import com.example.JokeApp.repository.JokeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JokeService {
    private final AccountRepository accountRepository;
    private final JokeRepository jokeRepository;
    private final JokeMapper jokeMapper;
    private final CategoryRepository categoryRepository;

    public List<JokeDto> fetchAll() {
        return jokeRepository.findAll().stream()
                .map(jokeMapper::toDto)
                .collect(Collectors.toList());
    }

    public JokeDto fetchById(UUID id) {
        return jokeMapper.toDto(jokeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Joke not found")));
    }

    public JokeDto create(JokeDto jokeDto) {
        Joke joke = jokeMapper.fromDto(jokeDto);
        joke.setId(null);
        joke.setCategory(categoryRepository.findByName(Ecategory.valueOf(jokeDto.getCategory())));
        joke.setWriter(accountRepository.findByUsername(jokeDto.getWriter())
                .orElseThrow(
                        () -> new EntityNotFoundException("Unable to find user " + jokeDto.getWriter())));
        return jokeMapper.toDto(jokeRepository.save(joke));
    }

    public JokeDto modify(JokeDto jokeDto) {
        Joke orig = jokeRepository.findById(jokeDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Joke not found"));
        orig.setCategory(categoryRepository.findByName(Ecategory.valueOf(jokeDto.getCategory())));
        orig.setDescription(jokeDto.getDescription());
        orig.setTitle(jokeDto.getTitle());
        orig.setWriter(accountRepository.findByUsername(jokeDto.getWriter())
                .orElseThrow(
                        () -> new EntityNotFoundException("Unable to find user " + jokeDto.getWriter())));
        return jokeMapper.toDto(jokeRepository.save(orig));
    }

    public void delete(UUID id) {
        jokeRepository.deleteById(id);
    }

    public List<JokeDto> fetchByWriter(String username) {
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException(("Unable to find user " + username)));
        return jokeRepository.findAllByWriter(account).stream()
                .map(jokeMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<JokeDto> fetchByCategory(String categoryName) {
        Category category = categoryRepository.findByName(Ecategory.valueOf(categoryName));
        return jokeRepository.findAllByCategory(category).stream()
                .map(jokeMapper::toDto)
                .collect(Collectors.toList());
    }
}
