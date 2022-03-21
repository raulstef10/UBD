package com.example.JokeApp.repository;

import com.example.JokeApp.model.Category;
import com.example.JokeApp.model.Ecategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(Ecategory name);
}
