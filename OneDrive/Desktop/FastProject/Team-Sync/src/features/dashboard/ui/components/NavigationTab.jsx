import { ChartArea } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

const NavigationTab = ({ path, icon, title }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex gap-3 px-2 py-1 rounded-sm ${isActive ? "border bg-gray-700" : ""}`
      }
      to={path}
      end='/'
    >
      <span>{icon}</span>
      {title}
    </NavLink>
  );
};

export default NavigationTab;
