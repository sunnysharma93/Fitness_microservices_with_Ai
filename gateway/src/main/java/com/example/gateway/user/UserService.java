package com.example.gateway.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final WebClient userServiceWebClient;

    public Mono<Boolean> validateUser(String userId) {
        log.info("calling User Service for {}", userId);

        // Reactive programming mein try-catch ki zaroorat nahi hoti, 
        // kyunki errors .onErrorResume mein handle hote hain.
        return userServiceWebClient.get()
                .uri("/api/users/{userId}/validate", userId)
                .retrieve()
                .bodyToMono(Boolean.class)
                .onErrorResume(WebClientResponseException.class, e -> {
                    if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                        return Mono.error(new RuntimeException("User not found: " + userId));
                    } else if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                        return Mono.error(new RuntimeException("Invalid request: " + userId));
                    }
                    return Mono.error(new RuntimeException("Unexpected error: " + userId));
                })
                // Agar koi bhi exception aaye aur aap crash nahi chahte, 
                // toh niche wali line false return karegi (Mono ke andar)
                .onErrorReturn(false);
    }

    public Mono<UserResponse> registerUser(RegisterRequest request) {
        log.info("Initiating user registration for email: {}", request.getEmail());

        return userServiceWebClient.post()
                .uri("/api/users/register")
                .bodyValue(request) // Request body pass kar rahe hain
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response -> {
                    log.error("Client error during registration for {}: {}", request.getEmail(), response.statusCode());
                    return response.bodyToMono(String.class)
                            .flatMap(errorBody -> Mono.error(new RuntimeException("Registration Failed: " + errorBody)));
                })
                .onStatus(HttpStatusCode::is5xxServerError, response -> {
                    log.error("Server error during registration for {}", request.getEmail());
                    return Mono.error(new RuntimeException("User Service is down. Please try later."));
                })
                .bodyToMono(UserResponse.class)
                .timeout(Duration.ofSeconds(5)) // Production mein timeout zaroori hai
                .doOnSuccess(user -> log.info("Successfully registered user: {}", user.getId()))
                .doOnError(error -> log.error("Error occurred while registering user: {}", error.getMessage()));
    }


}