package com.example.springapp.controller;

import com.example.springapp.model.Registration;
import com.example.springapp.service.RegistrationService;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "*")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;
    
    @PostMapping
    public ResponseEntity<?> registerStudent(@RequestBody Map<String, Object> request) {
        try {
            String studentId = (String) request.get("studentId");
            Long eventId = Long.valueOf(request.get("eventId").toString());
            
            Registration registration = registrationService.registerStudent(studentId, eventId);
            return ResponseEntity.status(HttpStatus.CREATED).body(registration);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("message", e.getMessage()));
        } catch (ValidationException e) {
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
            }
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/students/{studentId}")
    public ResponseEntity<?> getStudentRegistrations(@PathVariable String studentId) {
        try {
            List<Registration> registrations = registrationService.getStudentRegistrations(studentId);
            return ResponseEntity.ok(registrations);
        } catch (ValidationException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/events/{eventId}")
    public ResponseEntity<?> getEventRegistrations(@PathVariable Long eventId) {
        try {
            List<Registration> registrations = registrationService.getEventRegistrations(eventId);
            return ResponseEntity.ok(registrations);
        } catch (ValidationException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", e.getMessage()));
        }
    }
}
