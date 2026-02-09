package com.fitness.aiservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
@Slf4j
// @RequiredArgsConstructor hata dijiye, iski zaroorat nahi hai agar aap manual constructor use kar rahe hain
public class GeminiService {

    private final WebClient webClient;
    private final String geminiApiUrl;
    private final String geminiApiKey;

    // Constructor Injection use karna sabse best practice hai
    public GeminiService(
            WebClient.Builder webClientBuilder,
            @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent}") String geminiApiUrl,
            @Value("${gemini.api.key:AIzaSyC4z5di9aAEEXmvTDkj62GNdfc4OZFTa7k}") String geminiApiKey) { // Yahan ':NO_KEY_FOUND' add kiya

        this.webClient = webClientBuilder.build();
        this.geminiApiUrl = geminiApiUrl;
        this.geminiApiKey = geminiApiKey;
    }

    public String getRecommendations(String details) {
        Map<String, Object> requestBody = Map.of("contents", new Object[]{
                Map.of("parts", new Object[]{
                        Map.of("text", details)
                })
        });

        try {
            return webClient.post()
                    // URL mein key append karna zyada reliable hai Gemini ke liye
                    .uri(geminiApiUrl + "?key=" + geminiApiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block(); // Testing ke liye thik hai, production mein avoid karein
        } catch (Exception e) {
            log.error("Gemini API Error: {}", e.getMessage());
            return "Error calling AI Service";
        }
    }
}