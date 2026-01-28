package com.devops.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${cors.allowed.origins:http://localhost,http://localhost:80,http://localhost:3000}")
public class HealthController {

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Backend service is running");
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }

    @GetMapping("/info")
    public Map<String, String> info() {
        Map<String, String> response = new HashMap<>();
        response.put("application", "Full-Stack DevOps Pipeline");
        response.put("version", "1.0.0");
        response.put("description", "Spring Boot Backend");
        return response;
    }
}
