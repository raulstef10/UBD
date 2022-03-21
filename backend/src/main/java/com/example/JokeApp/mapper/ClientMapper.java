package com.example.JokeApp.mapper;

import com.example.JokeApp.dto.ClientDto;
import com.example.JokeApp.model.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.sql.Date;

@Mapper(componentModel = "spring")
public interface ClientMapper {

    @Named("StringToDate")
    static Date mapStringtoDate(String date) {
        try {
            return Date.valueOf(date);
        } catch (Exception e) {
            return null;
        }
    }

    @Mapping(source = "role", target = "role.name")
    @Mapping(source = "dateofbirth", target = "dateofbirth", qualifiedByName = "StringToDate")
    Account fromDto(ClientDto clientDto);

    @Mapping(source = "role.name", target = "role")
    @Mapping(source = "dateofbirth", target = "dateofbirth", dateFormat = "yyyy-MM-dd")
    ClientDto toDto(Account client);
}
