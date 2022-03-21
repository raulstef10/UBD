package com.example.JokeApp.repository;

import com.example.JokeApp.model.Account;
import com.example.JokeApp.model.Category;
import com.example.JokeApp.model.Joke;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface JokeRepository extends JpaRepository<Joke, UUID> {

    List<Joke> findAllByWriter(Account owner);

    List<Joke> findAllByCategory(Category category);
}
