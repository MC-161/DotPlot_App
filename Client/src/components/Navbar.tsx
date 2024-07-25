// src/components/SideNav.tsx
import React from "react";
import { Home, Person, ContactMail, Settings } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom"; // useLocation for getting current path
import logo from "@/assets/logo.svg";

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactElement;
};

const navItems: NavItem[] = [
  { name: "Overview", path: "/", icon: <Home /> },
  { name: "Patients", path: "/about", icon: <Person /> },
  { name: "Scans", path: "/contact", icon: <ContactMail /> },
  { name: "Settings", path: "/settings", icon: <Settings /> },
];

const SideNav: React.FC = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="w-64 h-full bg-[#20259E] text-white">
      <div className="pt-10 text-center flex items-center gap-4 justify-center mr-4">
        <img className="w-6" src={logo} alt="" />
        <p className="text-md font-bold">noName</p>
      </div>
      <nav className="mt-10">
        <ul className="space-y-2 ">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`flex items-center justify-center p-4 cursor-pointer w-full  ${
                location.pathname === item.path
                  ? "border-l-4 border-secondary"
                  : "hover:bg-[#4C4F9B] hover:text-black"
              }`}
            >
              <Link
                to={item.path}
                className={`flex items-center pr-10 text-sm w-[150px] p-0.5 ${
                  location.pathname !== item.path
                    ? "opacity-70"
                    : "text-secondary"
                }`}
              >
                <span className="mr-4">{item.icon}</span>
                <p className="font-normal">{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
