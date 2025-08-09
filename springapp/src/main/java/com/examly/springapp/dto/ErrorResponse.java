package com.examly.springapp.dto;

public class ErrorResponse {
    private String message;
    
    // Default constructor
    public ErrorResponse() {
    }
    
    // Constructor with message parameter
    public ErrorResponse(String message) {
        this.message = message;
    }
    
    // Getter
    public String getMessage() {
        return message;
    }
    
    // Setter
    public void setMessage(String message) {
        this.message = message;
    }
}
