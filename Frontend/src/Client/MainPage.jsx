

import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaFileAlt,
  FaCalendarAlt,
  FaClipboardList,
  FaComments,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import ProfileManagement from "./ProfileManagement";
import LawyersList from "./LawyerList";
import DocumentUpload from "./DocumentUpload";
import Appointments from "./Appointments";
import CaseRecords from "./Records";

const Sidebar = ({ onSelect, isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: "Lawyers", icon: <FaClipboardList />, key: "lawyers" },
    { name: "Documents", icon: <FaFileAlt />, key: "documents" },
    { name: "Appointments", icon: <FaCalendarAlt />, key: "appointments" },
    { name: "Display Records", icon: <FaClipboardList />, key: "records" },
    { name: "Edit Profile", icon: <FaUser />, key: "profile" },
    // { name: "Messages", icon: <FaComments />, key: "messages" },
  ];

  const [active, setActive] = useState("lawyers");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.name);
    }
  }, []);

  const handleSelect = (key) => {
    setActive(key);
    onSelect(key);

    // Close the sidebar only on mobile screens
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  const handleLogout = () => {
    // Clear user from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    // Redirect to login page
    window.location.href = "/";
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-600 border-r border-amber-500 p-4 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 min-h-screen z-50`}
    >
      <h2 className="text-2xl font-bold text-amber-400 text-center mb-6">
        Welcome {username}
      </h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.key}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-300 text-white ${
              active === item.key
                ? "bg-amber-500 text-gray-900"
                : "hover:bg-gray-800"
            }`}
            onClick={() => handleSelect(item.key)}
          >
            {item.icon}
            {item.name}
          </li>
        ))}

        {/* Logout Button */}
        <li
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-300 text-white hover:bg-red-600 mt-8"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </li>
      </ul>
    </div>
  );
};

const UserDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("lawyers");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "profile":
        return <ProfileManagement />;
      case "lawyers":
        return <LawyersList />;
      case "documents":
        return <DocumentUpload />;
      case "appointments":
        return <Appointments />;
      case "records":
        return <CaseRecords />;
      default:
        return (
          <div className="p-6 text-white">{selectedComponent} Content</div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-700 relative">
      <button
        className="md:hidden absolute top-4 left-4 p-4 text-white z-50"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>
      <Sidebar
        onSelect={setSelectedComponent}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 p-6">{renderComponent()}</div>
    </div>
  );
};

export default UserDashboard;
