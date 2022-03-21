package com.example.JokeApp.repository;

import com.example.JokeApp.model.security.Erole;
import com.example.JokeApp.model.security.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(Erole name);
}
