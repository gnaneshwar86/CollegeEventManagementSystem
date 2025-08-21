import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Settings, 
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  DollarSign,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data
  const stats = {
    totalEvents: 24,
    activeEvents: 8,
    totalAttendees: 1247,
    revenue: 45600
  };

  const recentEvents = [
    { id: 1, name: 'Tech Symposium 2025', date: '2025-08-25', status: 'active', attendees: 150, revenue: 7500 },
    { id: 2, name: 'Cultural Festival', date: '2025-08-30', status: 'pending', attendees: 300, revenue: 12000 },
    { id: 3, name: 'Sports Meet', date: '2025-09-05', status: 'draft', attendees: 200, revenue: 5000 },
    { id: 4, name: 'Alumni Reunion', date: '2025-09-10', status: 'active', attendees: 180, revenue: 9000 },
    { id: 5, name: 'Science Fair', date: '2025-09-15', status: 'completed', attendees: 120, revenue: 3600 }
  ];

  const upcomingEvents = [
    { id: 1, event: 'Photography Workshop', organizer: 'John Smith', department: 'Arts', date: '2025-08-28', registrations: 45 },
    { id: 2, event: 'Coding Bootcamp', organizer: 'Sarah Johnson', department: 'CS', date: '2025-09-02', registrations: 67 },
    { id: 3, event: 'Business Seminar', organizer: 'Mike Wilson', department: 'Business', date: '2025-09-08', registrations: 32 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, isPrimary = false }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${isPrimary ? 'border-l-8' : ''}`} 
         style={{ borderLeftColor: isPrimary ? '#FFD700' : '#00809D' }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-lg" 
             style={{ 
               background: isPrimary 
                 ? 'linear-gradient(135deg, #FFD700, #FFC107)' 
                 : 'linear-gradient(135deg, #00809D, #006B7A)' 
             }}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-4">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-500 text-sm font-medium">{trend}</span>
        </div>
      )}
    </div>
  );

  const Navigation = () => (
    <nav className="text-white p-4 shadow-lg" style={{ background: 'linear-gradient(90deg, #00809D, #006B7A)' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-lg" style={{ backgroundColor: '#FFD700' }}>
            <Calendar className="w-6 h-6" style={{ color: '#00809D' }} />
          </div>
          <h1 className="text-xl font-bold text-white">College Event Management</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#00809D' }} />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 text-gray-800"
              style={{ backgroundColor: '#FFD700', '--tw-ring-color': '#FFD700' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="hover:opacity-90 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  style={{ backgroundColor: '#FFD700', color: '#00809D' }}>
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </button>
        </div>
      </div>
    </nav>
  );

  const Sidebar = () => (
    <aside className="bg-white shadow-lg w-64 min-h-screen">
      <div className="p-6">
        <div className="space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'attendees', label: 'Attendees', icon: Users },
            { id: 'reports', label: 'Reports', icon: Activity },
            { id: 'analytics', label: 'Analytics', icon: PieChart },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === id 
                  ? 'text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={activeTab === id ? { 
                background: 'linear-gradient(90deg, #00809D, #006B7A)' 
              } : {}}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Calendar}
          title="Total Events"
          value={stats.totalEvents}
          subtitle="This academic year"
          trend="+12% from last year"
          isPrimary={true}
        />
        <StatCard
          icon={Activity}
          title="Active Events"
          value={stats.activeEvents}
          subtitle="Currently running"
        />
        <StatCard
          icon={Users}
          title="Total Attendees"
          value={stats.totalAttendees.toLocaleString()}
          subtitle="Registered participants"
          trend="+8% this month"
        />
        <StatCard
          icon={DollarSign}
          title="Revenue"
          value={`₹${(stats.revenue/1000).toFixed(0)}K`}
          subtitle="Event collections"
          trend="+15% this quarter"
          isPrimary={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <div className="w-1 h-6 mr-3 rounded" style={{ backgroundColor: '#00809D' }}></div>
            Recent Events
          </h3>
          <div className="space-y-4">
            {recentEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h4 className="font-medium text-gray-900">{event.name}</h4>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  <span className="text-sm text-gray-600">{event.attendees} attendees</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <div className="w-1 h-6 mr-3 rounded" style={{ backgroundColor: '#FFD700' }}></div>
            Upcoming Events
          </h3>
          <div className="space-y-4">
            {upcomingEvents.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border-l-4 hover:shadow-md transition-shadow" 
                   style={{ backgroundColor: '#F8F9FA', borderLeftColor: '#FFD700' }}>
                <div>
                  <h4 className="font-medium text-gray-900">{item.event}</h4>
                  <p className="text-sm text-gray-600">{item.organizer} • {item.department}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold" style={{ color: '#00809D' }}>{item.registrations}</p>
                  <p className="text-xs text-gray-500">registrations</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const EventsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <div className="w-2 h-8 mr-4 rounded" style={{ backgroundColor: '#00809D' }}></div>
          Event Management
        </h2>
        <div className="flex space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-opacity-75"
            style={{ borderColor: '#00809D' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
          </select>
          <button className="hover:opacity-90 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  style={{ backgroundColor: '#FFD700' }}>
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-white" style={{ background: 'linear-gradient(90deg, #00809D, #006B7A)' }}>
              <tr>
                <th className="px-6 py-4 text-left font-medium">Event Name</th>
                <th className="px-6 py-4 text-left font-medium">Date</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
                <th className="px-6 py-4 text-left font-medium">Attendees</th>
                <th className="px-6 py-4 text-left font-medium">Revenue</th>
                <th className="px-6 py-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{event.name}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{event.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{event.attendees}</td>
                  <td className="px-6 py-4 text-gray-600">₹{event.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="hover:opacity-80 p-1 transition-colors" style={{ color: '#FFD700' }}>
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="hover:opacity-80 p-1 transition-colors" style={{ color: '#00809D' }}>
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
        <div className="w-2 h-8 mr-4 rounded" style={{ backgroundColor: '#FFD700' }}></div>
        Event Reports
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4" style={{ borderTopColor: '#00809D' }}>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Event Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Events</span>
              <span className="font-bold" style={{ color: '#00809D' }}>24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed</span>
              <span className="font-bold text-green-600">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active</span>
              <span className="font-bold" style={{ color: '#FFD700' }}>6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Attendance</span>
              <span className="font-bold text-purple-600">156</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4" style={{ borderTopColor: '#FFD700' }}>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Events</h3>
          <div className="space-y-3">
            {recentEvents.slice(0, 3).map((event, index) => (
              <div key={event.id} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white`}
                     style={{ backgroundColor: index === 0 ? '#FFD700' : index === 1 ? '#00809D' : '#6B7280' }}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{event.name}</p>
                  <p className="text-xs text-gray-600">{event.attendees} attendees</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full hover:opacity-90 text-white p-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    style={{ backgroundColor: '#00809D' }}>
              <Download className="w-4 h-4" />
              <span>Export All Data</span>
            </button>
            <button className="w-full hover:opacity-90 text-gray-800 p-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    style={{ backgroundColor: '#FFD700' }}>
              <BarChart3 className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Send Notifications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
        <div className="w-2 h-8 mr-4 rounded" style={{ backgroundColor: '#00809D' }}></div>
        Analytics & Reports
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4" style={{ borderTopColor: '#00809D' }}>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Event Performance</h3>
          <div className="h-64 rounded-lg flex items-center justify-center" 
               style={{ background: 'linear-gradient(135deg, #E6F3F7, #B8D8E0)' }}>
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4" style={{ color: '#00809D' }} />
              <p className="text-gray-600">Interactive charts will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4" style={{ borderTopColor: '#FFD700' }}>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Distribution</h3>
          <div className="h-64 rounded-lg flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #FFF8E1, #FFE082)' }}>
            <div className="text-center">
              <PieChart className="w-16 h-16 mx-auto mb-4" style={{ color: '#FFD700' }} />
              <p className="text-gray-600">Revenue breakdown charts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['January', 'February', 'March', 'April'].map((month, index) => (
            <div key={month} className="text-center p-4 rounded-lg border-2 border-opacity-20"
                 style={{ borderColor: index % 2 === 0 ? '#00809D' : '#FFD700', backgroundColor: '#F8F9FA' }}>
              <h4 className="font-medium text-gray-900">{month}</h4>
              <p className="text-2xl font-bold mt-2" 
                 style={{ color: index % 2 === 0 ? '#00809D' : '#FFD700' }}>{(index + 1) * 3}</p>
              <p className="text-sm text-gray-600">Events</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AttendeesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <div className="w-2 h-8 mr-4 rounded" style={{ backgroundColor: '#FFD700' }}></div>
          Attendee Management
        </h2>
        <button className="hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                style={{ backgroundColor: '#00809D' }}>
          Export Attendee List
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Registrations</h3>
          <div className="flex space-x-3">
            <select className="px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-opacity-75"
                    style={{ borderColor: '#FFD700' }}>
              <option>All Events</option>
              <option>Tech Symposium 2025</option>
              <option>Cultural Festival</option>
              <option>Sports Meet</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4">
          {[
            { name: 'Alice Johnson', email: 'alice@college.edu', event: 'Tech Symposium 2025', status: 'confirmed' },
            { name: 'Bob Smith', email: 'bob@college.edu', event: 'Cultural Festival', status: 'pending' },
            { name: 'Carol Davis', email: 'carol@college.edu', event: 'Sports Meet', status: 'confirmed' }
          ].map((attendee, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                     style={{ 
                       background: index % 2 === 0 
                         ? 'linear-gradient(135deg, #00809D, #006B7A)' 
                         : 'linear-gradient(135deg, #FFD700, #FFC107)' 
                     }}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{attendee.name}</h4>
                  <p className="text-sm text-gray-600">{attendee.email}</p>
                  <p className="text-xs text-gray-500">{attendee.event}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                attendee.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {attendee.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'events': return <EventsTab />;
      case 'attendees': return <AttendeesTab />;
      case 'reports': return <ReportsTab />;
      case 'analytics': return <AnalyticsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;