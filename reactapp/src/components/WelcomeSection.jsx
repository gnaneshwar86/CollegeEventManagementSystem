import React from "react";
import { Calendar } from "lucide-react"; // ✅ import Calendar icon

function WelcomeSection() {
  const today = new Date();
  const hours = today.getHours();
  let greeting = "Welcome";

  if (hours < 12) greeting = "Good Morning";
  else if (hours < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <div className="bg-gradient-to-r from-[#00809D] to-[#00B4D8] rounded-2xl shadow-xl p-10 mb-8 flex items-center justify-between text-white">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold">{greeting}!</h1>
        <p className="text-lg md:text-xl mt-3 opacity-90">
          Explore the latest events and updates below.
        </p>
      </div>
      <div className="hidden md:flex items-center">
        <Calendar className="w-20 h-20" />
      </div>
    </div>
  );
}

export default WelcomeSection;
