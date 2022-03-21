package com.example.JokeApp.mapper;

import com.example.JokeApp.dto.JokeDto;
import com.example.JokeApp.model.Joke;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface JokeMapper {

    @Mapping(target = "writer", source = "writer.username")
    @Mapping(target = "category", source = "category.name")
    JokeDto toDto(Joke joke);

    @Mapping(target = "writer.username", source = "writer")
    @Mapping(target = "category.name", source = "category")
    Joke fromDto(JokeDto jokeDto);
}
