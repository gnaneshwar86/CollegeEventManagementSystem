package com.example.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @Column(name = "student_id")
    private String studentId;
    
    @NotBlank
    private String name;
    
    @Email
    @NotBlank
    private String email;
    
    @NotBlank
    private String department;
}
