// src/components/SideNav.tsx
import React from 'react';
import { Home, Info, ContactMail, Settings } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom'; // useLocation for getting current path

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactElement;
};

const navItems: NavItem[] = [
  { name: 'Home', path: '/', icon: <Home /> },
  { name: 'About', path: '/about', icon: <Info /> },
  { name: 'Contact', path: '/contact', icon: <ContactMail /> },
  { name: 'Settings', path: '/settings', icon: <Settings /> },
];

const SideNav: React.FC = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4 text-center text-xl font-bold">
        MyApp
      </div>
      <nav className='border-2'>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`flex items-center justify-center p-4 cursor-pointer w-full ${
                location.pathname === item.path ? 'bg-gray-700' : 'hover:bg-gray-600'
              }`}
            >
              <Link to={item.path} className="flex items-center pr-10">
                <span className="mr-4">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
