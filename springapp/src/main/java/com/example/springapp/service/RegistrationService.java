package com.example.springapp.service;

import com.example.springapp.model.Event;
import com.example.springapp.model.Registration;
import com.example.springapp.model.Student;
import com.example.springapp.repository.EventRepository;
import com.example.springapp.repository.RegistrationRepository;
import com.example.springapp.repository.StudentRepository;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

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
    
    public Registration registerStudent(String studentId, Long eventId) {
        Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new ValidationException("Student not found"));
        
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new ValidationException("Event not found"));
        
        // Check if already registered
        if (registrationRepository.existsByStudentAndEvent(student, event)) {
            throw new DataIntegrityViolationException("Student already registered for this event");
        }
        
        // Check capacity
        List<Registration> existingRegistrations = registrationRepository.findByEvent(event);
        if (existingRegistrations.size() >= event.getCapacity()) {
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
        Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new ValidationException("Student not found"));
        return registrationRepository.findByStudent(student);
    }
    
    public List<Registration> getEventRegistrations(Long eventId) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new ValidationException("Event not found"));
        return registrationRepository.findByEvent(event);
    }
}
