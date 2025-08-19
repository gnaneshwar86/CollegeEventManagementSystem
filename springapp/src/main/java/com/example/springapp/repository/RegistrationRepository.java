package com.example.springapp.repository;

import com.example.springapp.model.Registration;
import com.example.springapp.model.Student;
import com.example.springapp.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByStudent(Student student);
    List<Registration> findByEvent(Event event);
    boolean existsByStudentAndEvent(Student student, Event event);
}
