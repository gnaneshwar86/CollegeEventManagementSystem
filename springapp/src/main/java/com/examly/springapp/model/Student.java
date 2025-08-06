package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;

@Entity
@Table(name = "students")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    
    @Id
    private String studentId;
    
    @NotNull(message = "Name is required")
    @Column(nullable = false)
    private String name;
    
    @NotNull(message = "Email is required")
    @Email(message = "Email must be a valid email format")
    @Column(nullable = false, unique = true)
    private String email;
    
    private String department;
    
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Registration> registrations;
}
