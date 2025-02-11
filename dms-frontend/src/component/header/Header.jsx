import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      {/* Left Section: Search Input with Icon */}
      <div className="w-3/4 relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
          size={20} 
        />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full max-w-sm min-w-[200px] pl-10 pr-4 py-2 rounded-full bg-gray-100 text-gray-800 focus:outline-none"
        />
      </div>
      
      {/* Right Section: Sign In/Up and Icons */}
      <div className="flex items-center space-x-6">
        <button className="px-5 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors font-medium">
          Sign In / Up
        </button>
        <div className="flex items-center space-x-4">
          <Bell className="cursor-pointer hover:text-yellow-300 transition-colors" size={28} />
          <User className="cursor-pointer hover:text-yellow-300 transition-colors" size={28} />
        </div>
      </div>
    </header>
  );
};

export default Header;