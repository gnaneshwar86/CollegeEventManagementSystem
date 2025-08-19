package com.example.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
    private String name;
    
    @NotNull(message = "Email is required")
    @Email(message = "Email must be a valid email format")
    private String email;
    
    private String department;
    
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"student"})
    private List<Registration> registrations;
}
