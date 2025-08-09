package com.examly.springapp.dto;

public class RegistrationRequest {
    private String studentId;
    private Long eventId;
    
    // Default constructor
    public RegistrationRequest() {
    }
    
    // Constructor with parameters
    public RegistrationRequest(String studentId, Long eventId) {
        this.studentId = studentId;
        this.eventId = eventId;
    }
    
    // Getters
    public String getStudentId() {
        return studentId;
    }
    
    public Long getEventId() {
        return eventId;
    }
    
    // Setters
    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
    
    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }
}
