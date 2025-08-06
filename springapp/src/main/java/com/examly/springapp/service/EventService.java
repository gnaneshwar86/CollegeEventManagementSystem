package com.examly.springapp.service;

import com.examly.springapp.model.Event;
import com.examly.springapp.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    public Event createEvent(Event event) {
        // Manual validation to match test expectations
        if (event.getEventName() == null || event.getEventName().length() < 5 || event.getEventName().length() > 100) {
            throw new ValidationException("eventName must be between 5 and 100 characters");
        }
        if (event.getCapacity() != null && event.getCapacity() <= 0) {
            throw new ValidationException("Capacity must be positive");
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

class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}
