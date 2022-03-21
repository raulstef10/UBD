package com.example.JokeApp.repository;

import com.example.JokeApp.model.Account;
import com.example.JokeApp.model.security.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

    Optional<Account> findByUsername(String username);

    List<Account> findAllByRole(Role role);

    boolean existsByUsername(String username);
}
