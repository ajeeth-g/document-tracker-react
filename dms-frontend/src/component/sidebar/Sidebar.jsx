import { House, Bolt, Menu, X, UploadIcon } from 'lucide-react';
import { useState } from 'react';
import NavigationLink from '../navigationLink/NavigationLink';
import Logo from "../../assets/logo-light.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${isOpen ? "w-64" : "w-16"} min-h-screen transition-all duration-300 relative bg-white shadow-lg px-4`}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-5 top-4 bg-blue-600 p-2 rounded-full text-white z-10"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo Section */}
      <div className={`flex items-center justify-center py-6 ${isOpen ? "" : "py-4"}`}>
        <img
          src={Logo}
          alt="iStreams ERP Solutions"
          className={`transition-all duration-300 ${isOpen ? "w-32" : "w-8"}`}
        />
      </div>

      {/* Navigation Links */}
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <NavigationLink
              to="/"
              label={isOpen ? "Dashboard" : ""}
              icon={<House className="mr-1 text-gray-800" />}
              className="text-gray-800 hover:bg-gray-200"
            />
          </li>
          <li>
            <NavigationLink
              to="/upload"
              label={isOpen ? "Upload Document" : ""}
              icon={<UploadIcon className="mr-1 text-gray-800" />}
              className="text-gray-800 hover:bg-gray-200"
            />
          </li>
          <li>
            <NavigationLink
              to="/settings"
              label={isOpen ? "Settings" : ""}
              icon={<Bolt className="mr-1 text-gray-800" />}
              className="text-gray-800 hover:bg-gray-200"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;