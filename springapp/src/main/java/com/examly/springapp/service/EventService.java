package com.examly.springapp.service;

import com.examly.springapp.model.Event;
import com.examly.springapp.repository.EventRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private Validator validator;
    
    public Event createEvent(Event event) {
        Set<ConstraintViolation<Event>> violations = validator.validate(event);
        if (!violations.isEmpty()) {
            // Get the first violation message, prioritizing eventName validation
            String message = violations.stream()
                .filter(v -> v.getPropertyPath().toString().equals("eventName"))
                .findFirst()
                .orElse(violations.iterator().next())
                .getMessage();
            throw new ValidationException(message);
        }
        return eventRepository.save(event);
    }
    
    public Page<Event> getEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return eventRepository.findAll(pageable);
    }
    
    public Optional<Event> getEventById(Long eventId) {
        return eventRepository.findById(eventId);
    }
}
