import { NavLink } from "react-router-dom";

const NavigationLink = ({ to, label, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-full transition-colors ${isActive
          ? "bg-gray-200 text-gray-900 font-semibold"
          : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      {label && <span className="ml-2">{label}</span>}
    </NavLink>
  );
};

export default NavigationLink;