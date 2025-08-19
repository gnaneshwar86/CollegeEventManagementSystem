package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "registrations", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "event_id"}))
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long registrationId;
    
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "student_id", referencedColumnName = "student_id")
    private Student student;
    
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "event_id")
    private Event event;
    
    private LocalDateTime registrationDate;
    
    private Boolean attended;
}
