// src/components/EventCard.jsx
import React from "react";
import { Calendar, Clock, MapPin, BookOpen, Users, UserCheck } from "lucide-react";

const getCategoryColor = (category) => {
  switch (category?.toUpperCase()) {
    case "WORKSHOP":
      return "#E6F3F7";
    case "SEMINAR":
      return "#FFF8E1";
    case "CONFERENCE":
      return "#F4E6FF";
    case "HACKATHON":
      return "#FFE6E6";
    case "CULTURAL":
      return "#FFD9EC";
    case "SPORTS":
      return "#E6FBF9";
    case "TECHNICAL":
      return "#DFF5E1";
    case "OTHER":
      return "#F8F9FA";
    default:
      return "#F8F9FA";
  }
};

const EventCard = ({ event, onRegister, showActions = true }) => (
  <div
    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-3 border-opacity-30"
    style={{ borderColor: getCategoryColor(event.category) }}
  >
    <div className="flex items-center p-6">
      {/* Left Section - Icon */}
      <div className="flex-shrink-0 mr-6">
        <div
          className="w-20 h-20 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: getCategoryColor(event.category) }}
        >
          <Calendar className="w-8 h-8" />
        </div>
      </div>

      {/* Center Section - Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {event.eventName}
            </h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {event.description}
            </p>
          </div>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium text-black"
            style={{ backgroundColor: getCategoryColor(event.category) }}
          >
            {event.category}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{event.department}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex items-center justify-between">
            {/* Capacity Bar */}
            <div className="flex items-center space-x-4 flex-1">
              <Users className="w-4 h-4 text-gray-500" />
              <div className="flex-1 max-w-32">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(event.currentCapacity / event.capacity) * 100}%`,
                      backgroundColor: "#FFD700",
                    }}
                  ></div>
                </div>
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                {event.currentCapacity}/{event.capacity}
              </span>
            </div>

            {/* Register Button */}
            <div className="ml-6">
              <button
                onClick={() => onRegister(event.eventId)}
                disabled={event.currentCapacity >= event.capacity}
                className={`px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors ${
                  event.currentCapacity >= event.capacity
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "text-white hover:opacity-90"
                }`}
                style={
                  event.currentCapacity < event.capacity
                    ? { backgroundColor: "#00809D" }
                    : {}
                }
              >
                <UserCheck className="w-4 h-4" />
                <span>
                  {event.currentCapacity >= event.capacity ? "Full" : "Register"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default EventCard;
