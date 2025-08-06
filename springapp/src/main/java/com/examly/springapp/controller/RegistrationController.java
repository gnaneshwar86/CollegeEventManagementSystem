package com.examly.springapp.controller;

import com.examly.springapp.dto.ErrorResponse;
import com.examly.springapp.dto.RegistrationRequest;
import com.examly.springapp.model.Registration;
import com.examly.springapp.service.RegistrationService;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {
    
    @Autowired
    private RegistrationService registrationService;
    
    @PostMapping
    public ResponseEntity<?> registerStudent(@RequestBody RegistrationRequest request) {
        try {
            Registration registration = registrationService.registerStudent(
                request.getStudentId(), request.getEventId());
            return ResponseEntity.status(HttpStatus.CREATED).body(registration);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse(e.getMessage()));
        } catch (ValidationException e) {
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage()));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
            }
        }
    }
    
    @GetMapping("/students/{studentId}")
    public ResponseEntity<?> getStudentRegistrations(@PathVariable String studentId) {
        try {
            List<Registration> registrations = registrationService.getStudentRegistrations(studentId);
            return ResponseEntity.ok(registrations);
        } catch (ValidationException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(e.getMessage()));
        }
    }
}
