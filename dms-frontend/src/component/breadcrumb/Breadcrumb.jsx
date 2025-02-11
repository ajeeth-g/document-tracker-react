import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Breadcrumb = ({ links }) => {
  return (
    <nav className="flex px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {links.map((link, index) => (
          <li key={index} aria-current={index === links.length - 1 ? "page" : undefined}>
            <div className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              )}
              {link.to ? (
                <NavLink
                  to={link.to}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  {link.label}
                </NavLink>
              ) : (
                <span className="text-sm font-medium text-gray-500">
                  {link.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
