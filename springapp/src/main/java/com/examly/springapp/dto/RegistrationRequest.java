package com.examly.springapp.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegistrationRequest {
    @NotNull(message = "Student ID is required")
    private String studentId;
    
    @NotNull(message = "Event ID is required")
    private Long eventId;
}
