import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Clock, MapPin, Users, Tag, X, User, Mail, Phone, BookOpen } from 'lucide-react';

// Mock data based on your Event model
const mockEvents = [
  {
    eventId: 1,
    eventName: "Tech Conference 2024",
    description: "Annual technology conference featuring latest trends in software development, AI, and cloud computing.",
    date: "2024-09-15",
    time: "09:00",
    venue: "Grand Convention Center",
    capacity: 500,
    category: "TECHNOLOGY",
    registrations: []
  },
  {
    eventId: 2,
    eventName: "Cultural Festival",
    description: "Celebrate diversity through music, dance, food, and traditional performances from around the world.",
    date: "2024-09-22",
    time: "18:00",
    venue: "University Amphitheater",
    capacity: 1000,
    category: "CULTURAL",
    registrations: []
  },
  {
    eventId: 3,
    eventName: "Career Development Workshop",
    description: "Learn essential skills for job interviews, resume building, and professional networking.",
    date: "2024-09-28",
    time: "14:00",
    venue: "Business Building Room 301",
    capacity: 50,
    category: "EDUCATIONAL",
    registrations: []
  },
  {
    eventId: 4,
    eventName: "Annual Sports Meet",
    description: "Inter-college sports competition featuring multiple athletic events and team competitions.",
    date: "2024-10-05",
    time: "08:00",
    venue: "Sports Complex",
    capacity: 2000,
    category: "SPORTS",
    registrations: []
  },
  {
    eventId: 5,
    eventName: "Student Leadership Summit",
    description: "Develop leadership skills and network with student leaders from various departments.",
    date: "2024-10-12",
    time: "10:00",
    venue: "Student Union Building",
    capacity: 150,
    category: "EDUCATIONAL",
    registrations: []
  }
];

const categoryColors = {
  TECHNOLOGY: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700', badge: 'bg-blue-500' },
  CULTURAL: { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-700', badge: 'bg-orange-500' },
  EDUCATIONAL: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700', badge: 'bg-green-500' },
  SPORTS: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700', badge: 'bg-red-500' },
  SOCIAL: { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-700', badge: 'bg-purple-500' }
};

export default function EventsPage() {
  const [events, setEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    studentName: '',
    email: '',
    phone: '',
    studentId: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  // Filter events based on search and category
  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'ALL') {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, categoryFilter]);

  const handleRegistrationOpen = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const handleRegistrationClose = () => {
    setShowRegistrationModal(false);
    setSelectedEvent(null);
    setRegistrationForm({
      studentName: '',
      email: '',
      phone: '',
      studentId: ''
    });
  };

  const handleFormChange = (field, value) => {
    setRegistrationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update the event with new registration
      const updatedEvents = events.map(event => {
        if (event.eventId === selectedEvent.eventId) {
          return {
            ...event,
            registrations: [...(event.registrations || []), registrationForm]
          };
        }
        return event;
      });

      setEvents(updatedEvents);
      setAlert({
        show: true,
        message: `Successfully registered for ${selectedEvent.eventName}!`,
        type: 'success'
      });
      setLoading(false);
      handleRegistrationClose();

      // Hide alert after 3 seconds
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    }, 1000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAvailableSpots = (event) => {
    const registeredCount = event.registrations ? event.registrations.length : 0;
    return event.capacity - registeredCount;
  };

  const isFormValid = () => {
    return registrationForm.studentName.trim() && 
           registrationForm.email.trim() && 
           registrationForm.phone.trim() && 
           registrationForm.studentId.trim();
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Alert */}
      {alert.show && (
        <div className={`mx-4 mt-4 p-4 rounded-lg ${alert.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
          {alert.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Events</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, description, or venue..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="ALL">All Categories</option>
                  <option value="TECHNOLOGY">Technology</option>
                  <option value="CULTURAL">Cultural</option>
                  <option value="EDUCATIONAL">Educational</option>
                  <option value="SPORTS">Sports</option>
                  <option value="SOCIAL">Social</option>
                </select>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{filteredEvents.length}</p>
              <p className="text-sm text-gray-500">Events Found</p>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const categoryStyle = categoryColors[event.category] || categoryColors.SOCIAL;
            const availableSpots = getAvailableSpots(event);
            const isEventFull = availableSpots === 0;
            
            return (
              <div key={event.eventId} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                {/* Category Header */}
                <div className={`h-2 ${categoryStyle.badge}`}></div>
                
                <div className="p-6">
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex-1 pr-2">
                      {event.eventName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${categoryStyle.badge} whitespace-nowrap`}>
                      {event.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2 text-blue-500" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-2 text-green-500" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-red-500" />
                      <span className="text-sm">{event.venue}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Users size={16} className="mr-2 text-purple-500" />
                      <span className="text-sm">
                        {availableSpots} / {event.capacity} spots available
                      </span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Capacity</span>
                      <span>{((event.capacity - availableSpots) / event.capacity * 100).toFixed(0)}% filled</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          availableSpots < event.capacity * 0.2 ? 'bg-red-500' :
                          availableSpots < event.capacity * 0.5 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${((event.capacity - availableSpots) / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <button
                    onClick={() => handleRegistrationOpen(event)}
                    disabled={isEventFull}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      isEventFull
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isEventFull ? 'Event Full' : 'Register Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Events Found */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search terms or category filter</p>
          </div>
        )}

        {/* Registration Modal */}
        {showRegistrationModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Register for Event</h2>
                  <p className="text-gray-600 mt-1">{selectedEvent.eventName}</p>
                </div>
                <button
                  onClick={handleRegistrationClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <form onSubmit={handleRegistration} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={registrationForm.studentName}
                    onChange={(e) => handleFormChange('studentName', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <BookOpen size={16} className="inline mr-2" />
                    Student ID
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={registrationForm.studentId}
                    onChange={(e) => handleFormChange('studentId', e.target.value)}
                    placeholder="Enter your student ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={registrationForm.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={registrationForm.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Event Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Event Summary</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Date:</strong> {formatDate(selectedEvent.date)}</p>
                    <p><strong>Time:</strong> {selectedEvent.time}</p>
                    <p><strong>Venue:</strong> {selectedEvent.venue}</p>
                    <p><strong>Available Spots:</strong> {getAvailableSpots(selectedEvent)}</p>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleRegistrationClose}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !isFormValid()}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}