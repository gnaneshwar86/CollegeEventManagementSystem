package com.examly.springapp.service;

import com.examly.springapp.model.Event;
import com.examly.springapp.model.Registration;
import com.examly.springapp.model.Student;
import com.examly.springapp.repository.EventRepository;
import com.examly.springapp.repository.RegistrationRepository;
import com.examly.springapp.repository.StudentRepository;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RegistrationService {
    
    @Autowired
    private RegistrationRepository registrationRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private EventRepository eventRepository;
    
    @Transactional
    public Registration registerStudent(String studentId, Long eventId) {
        // Check if student exists
        Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new ValidationException("Student not found"));
        
        // Check if event exists
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new ValidationException("Event not found"));
        
        // Check if student is already registered
        if (registrationRepository.existsByStudentStudentIdAndEventEventId(studentId, eventId)) {
            throw new DataIntegrityViolationException("Student already registered for this event");
        }
        
        // Check event capacity
        long currentRegistrations = registrationRepository.countByEventId(eventId);
        if (currentRegistrations >= event.getCapacity()) {
            throw new ValidationException("Event is at full capacity");
        }
        
        Registration registration = Registration.builder()
            .student(student)
            .event(event)
            .registrationDate(LocalDateTime.now())
            .attended(false)
            .build();
        
        return registrationRepository.save(registration);
    }
    
    public List<Registration> getStudentRegistrations(String studentId) {
        // Check if student exists
        if (!studentRepository.existsById(studentId)) {
            throw new ValidationException("Student not found");
        }
        
        return registrationRepository.findByStudentStudentId(studentId);
    }
}
