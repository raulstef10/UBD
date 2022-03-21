package com.example.JokeApp;

import com.example.JokeApp.model.Account;
import com.example.JokeApp.model.Category;
import com.example.JokeApp.model.Ecategory;
import com.example.JokeApp.model.Joke;
import com.example.JokeApp.model.security.Erole;
import com.example.JokeApp.model.security.Role;
import com.example.JokeApp.repository.AccountRepository;
import com.example.JokeApp.repository.CategoryRepository;
import com.example.JokeApp.repository.JokeRepository;
import com.example.JokeApp.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class Bootstrapper implements ApplicationListener<ApplicationReadyEvent> {

    private final RoleRepository roleRepository;
    private final AccountRepository accountRepository;
    private final JokeRepository jokeRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;
    @Value("${app.bootstrap}")
    private Boolean bootstrap;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        if (bootstrap) {
            accountRepository.deleteAll();
            roleRepository.deleteAll();

            for (Erole r : Erole.values()) {
                Role role = Role.builder().name(r).build();
                roleRepository.save(role);
            }

            for (Ecategory r : Ecategory.values()) {
                Category category = Category.builder().name(r).build();
                categoryRepository.save(category);
            }

            Account adminacc = accountRepository.save(Account.builder()
                    .role(roleRepository.findByName(Erole.ADMINISTRATOR))
                    .username("admin")
                    .password(passwordEncoder.encode("hello"))
                    .build());
            Account clientacc = accountRepository.save(Account.builder()
                    .role(roleRepository.findByName(Erole.CLIENT))
                    .username("user")
                    .fullname("Foo Bar")
                    .dateofbirth(Date.valueOf(LocalDate.now()))
                    .address("Testing street")
                    .password(passwordEncoder.encode("hello"))
                    .build());
            jokeRepository.save(Joke.builder()
                    .title("SLEEPING DOGS")
                    .category(categoryRepository.findByName(Ecategory.ANIMAL))
                    .writer(clientacc)
                    .description("On a Facebook page for beginning artists, one asked," +
                            " “Any suggestions for painting dogs?” Another responded,  “" +
                            "Wait till they’re asleep.”")
                    .build());
            jokeRepository.save(Joke.builder()
                    .title("THE IDK MISTERY")
                    .category(categoryRepository.findByName(Ecategory.BLONDE))
                    .writer(adminacc)
                    .description("Blonde: \"What does IDK stand for?\"\n" +
                            "Brunette: \"I don’t know.\"\n" +
                            "Blonde: \"OMG, nobody does!\"")
                    .build());
            jokeRepository.save(Joke.builder()
                    .title("TWEETMENT NEEDED")
                    .category(categoryRepository.findByName(Ecategory.COMPUTER))
                    .writer(clientacc)
                    .description("PATIENT: Doctor, I need your help. I'm addicted to checking my Twitter!" +
                            " DOCTOR: I'm so sorry, I don't follow.")
                    .build());
            jokeRepository.save(Joke.builder()
                    .title("MUSICAL MIRACLES")
                    .category(categoryRepository.findByName(Ecategory.DOCTOR))
                    .writer(adminacc)
                    .description("“Doctor, doctor, will I be able to play the violin after the operation?”\n" +
                            "“Yes, of course.”\n" +
                            "“Great! I never could before!”")
                    .build());
            jokeRepository.save(Joke.builder()
                    .title("NUMERIC CONFLICT")
                    .category(categoryRepository.findByName(Ecategory.MATH))
                    .writer(clientacc)
                    .description("Pi was fighting with an imaginary number: " +
                            "“Get real,” pi said. “Be rational,”" +
                            " the imaginary number said.")
                    .build());
        }
    }
}
