import React, { useState } from 'react';
import { Calendar, Search, Bell, Settings } from 'lucide-react';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <nav
      className="fixed top-0 left-0 w-full h-[15vh] z-50 text-white shadow-lg"
      style={{ background: 'linear-gradient(90deg, #00809D, #006B7A)' }}
    >
      <div className="h-full flex items-center justify-between px-6">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-lg bg-[#FFD700]">
            <Calendar className="w-6 h-6" style={{ color: '#00809D' }} />
          </div>
          <h1 className="text-2xl font-bold">EventMate</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: '#00809D' }}
            />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 text-gray-800"
              style={{ backgroundColor: '#FFD700', '--tw-ring-color': '#FFD700' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Bell */}
          <button className="hover:opacity-90 p-2 rounded-lg transition-colors bg-[#FFD700]">
            <Bell className="w-5 h-5" style={{ color: '#00809D' }} />
          </button>

          {/* Settings */}
          <button className="hover:opacity-90 p-2 rounded-lg transition-colors bg-[#FFD700]">
            <Settings className="w-5 h-5" style={{ color: '#00809D' }} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
