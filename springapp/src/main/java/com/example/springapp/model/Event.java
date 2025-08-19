package com.example.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;
    
    @NotBlank
    @Size(min = 5, max = 100, message = "eventName must be between 5 and 100 characters")
    private String eventName;
    
    private String description;
    
    @NotNull
    private LocalDate date;
    
    @NotBlank
    private String time;
    
    @NotBlank
    private String venue;
    
    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;
    
    @Enumerated(EnumType.STRING)
    @NotNull
    private EventCategory category;
}
