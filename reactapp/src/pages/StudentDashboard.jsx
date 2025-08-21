import React, { useEffect, useState } from 'react';
import { Calendar, Users, Search,Filter,Clock,MapPin,User,Mail,Phone,DollarSign,CheckCircle,XCircle,Eye,UserCheck,UserX,BookOpen,Star,Tag,Info,Bell,Settings,LogOut} from 'lucide-react';
import apiService from '../services/api';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [allEvents, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const eventsData = await apiService.getAllEvents();
          setEvents(eventsData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchEvents();
    }, []);

  const getCategoryColor = (category) => {
  switch (category?.toUpperCase()) {
    case 'WORKSHOP': return '#E6F3F7';
    case 'SEMINAR': return '#FFF8E1';
    case 'CONFERENCE': return '#F4E6FF';
    case 'HACKATHON': return '#FFE6E6';
    case 'CULTURAL': return '#FFD9EC';
    case 'SPORTS': return '#E6FBF9';
    case 'TECHNICAL': return '#DFF5E1';
    case 'OTHER': return '#F8F9FA';
    default: return '#F8F9FA';
  }
};


  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });


  const navigate = useNavigate();

  const goToRegistrationPage = () => {
    navigate(`/register`); 
  };

  // Generic Welcome Section
const WelcomeSection = () => {
  const today = new Date();
  const hours = today.getHours();
  let greeting = 'Welcome';

  if (hours < 12) greeting = 'Good Morning';
  else if (hours < 18) greeting = 'Good Afternoon';
  else greeting = 'Good Evening';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{greeting}!</h1>
        <p className="text-gray-600 mt-1">Explore the latest events and updates below.</p>
      </div>
      <div className="hidden md:flex items-center">
        <Calendar className="w-12 h-12 text-[#00809D]" />
      </div>
    </div>
  );
};

  const EventCard = ({ event, showActions = true }) => (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-3 border-opacity-30"
      style={{ borderColor: getCategoryColor(event.category) }}
    >
      <div className="flex items-center p-6">
        {/* Left Section - Event Image/Icon Placeholder */}
        <div className="flex-shrink-0 mr-6">
          <div className="w-20 h-20 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: getCategoryColor(event.category) }}>
            <Calendar className="w-8 h-8" />
          </div>
        </div>

        {/* Center Section - Event Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{event.eventName}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{event.description}</p>
            </div>
            <div className="flex items-center space-x-3 ml-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium text-black"
                    style={{ backgroundColor: getCategoryColor(event.category) }}>
                {event.category}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{event.date}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{event.time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{event.department}</span>
            </div>
          </div>

          {showActions && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <Users className="w-4 h-4 text-gray-500" />
                <div className="flex-1 max-w-32">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full" 
                        style={{ 
                          width: `${(event.currentCapacity / event.capacity) * 100}%`,
                          backgroundColor: '#FFD700'
                        }}></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {event.currentCapacity}/{event.capacity}
                </span>
              </div>
              
              <div className="ml-6">
                <button
                  onClick={() => goToRegistrationPage(event.eventId)}
                  disabled={event.currentCapacity >= event.capacity}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors ${
                    event.currentCapacity >= event.capacity
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'text-white hover:opacity-90'
                  }`}
                  style={event.currentCapacity < event.capacity ? { backgroundColor: '#00809D' } : {}}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{event.currentCapacity >= event.capacity ? 'Full' : 'Register'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );


  const EventsTab = () => {
  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin border-4 border-t-[#00809D] border-gray-200 rounded-full w-12 h-12 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">Error loading events</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WelcomeSection />

      {/* Filters and Browse Events */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <div className="w-2 h-8 mr-4 rounded" style={{ backgroundColor: '#00809D' }}></div>
          Browse Events
        </h2>
        <div className="flex space-x-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-opacity-75"
            style={{ borderColor: '#FFD700' }}
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="career">Career</option>
            <option value="academic">Academic</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Available Events */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#00809D]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Available Events</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{filteredEvents.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-[#00809D]" />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#FFD700]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Upcoming Events</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {filteredEvents.filter(e => new Date(e.date) > new Date()).length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-[#FFD700]" />
          </div>
        </div>

        {/* Most Popular Event */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#10B981]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Most Popular Event</p>
              <p className="text-xl font-bold text-gray-900 mt-2">
                {filteredEvents.length > 0
                  ? filteredEvents.reduce((prev, current) => 
                      (current.currentCapacity > prev.currentCapacity ? current : prev)
                    ).eventName
                  : 'N/A'}
              </p>
            </div>
            <Star className="w-8 h-8 text-[#10B981]" />
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.eventId} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};


  return (
    <div className="min-h-screen bg-gray-100">
        <main className="flex-1 p-6">
          {<EventsTab />}
        </main>
    </div>
  );
};

export default StudentDashboard;