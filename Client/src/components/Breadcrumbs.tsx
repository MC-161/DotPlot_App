// components/Breadcrumbs.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Breadcrumb {
  name: string;
  path: string;
}

const Breadcrumbs: React.FC<{ breadcrumbs: Breadcrumb[] }> = ({ breadcrumbs }) => {
  return (
    <nav className="mb-4">
      <ol className="flex space-x-2 text-gray-600">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            <Link
              to={crumb.path}
              className={`text-blue-500 hover:text-blue-700 ${
                index === breadcrumbs.length - 1 ? 'font-bold' : ''
              }`}
            >
              {crumb.name}
            </Link>
            {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
