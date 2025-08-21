// api.js - API service for React frontend
const BASE_URL = 'http://localhost:8080/api';

class ApiService {
  // Helper method for making HTTP requests
  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Event API methods
  async getAllEvents() {
    return this.request('/events');
  }

  async getEventById(id) {
    return this.request(`/events/${id}`);
  }

  async createEvent(event) {
    return this.request('/events', {
      method: 'POST',
      body: event,
    });
  }

  async updateEvent(id, event) {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: event,
    });
  }

  async deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  async getEventsByCategory(category) {
    return this.request(`/events/category/${category}`);
  }

  async getEventsByDepartment(department) {
    return this.request(`/events/department/${department}`);
  }

  async getUpcomingEvents() {
    return this.request('/events/upcoming');
  }

  async getAvailableEvents() {
    return this.request('/events/available');
  }

  // Student API methods
  async getAllStudents() {
    return this.request('/students');
  }

  async getStudentById(id) {
    return this.request(`/students/${id}`);
  }

  async getStudentByEmail(email) {
    return this.request(`/students/email/${email}`);
  }

  async createStudent(student) {
    return this.request('/students', {
      method: 'POST',
      body: student,
    });
  }

  async updateStudent(id, student) {
    return this.request(`/students/${id}`, {
      method: 'PUT',
      body: student,
    });
  }

  async deleteStudent(id) {
    return this.request(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  // Registration API methods
  async getAllRegistrations() {
    return this.request('/registrations');
  }

  async getRegistrationById(id) {
    return this.request(`/registrations/${id}`);
  }

  async registerStudentForEvent(studentId, eventId) {
    return this.request(`/registrations/register/${studentId}/${eventId}`, {
      method: 'POST',
    });
  }

  async cancelRegistration(id) {
    return this.request(`/registrations/${id}`, {
      method: 'DELETE',
    });
  }

  async markAttendance(id, attended) {
    return this.request(`/registrations/${id}/attendance?attended=${attended}`, {
      method: 'PUT',
    });
  }

  async getStudentRegistrations(studentId) {
    return this.request(`/registrations/student/${studentId}`);
  }

  async getEventRegistrations(eventId) {
    return this.request(`/registrations/event/${eventId}`);
  }
}

// Export a single instance
const apiService = new ApiService();
export default apiService;