

import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaFileAlt,
  FaClipboardList,
  FaComments,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";

import DocumentUpload from "../Client/DocumentUpload";
import CaseDashboard from "./Results";
import ClientRequests from "./ClientRequests";
import LawyerProfileManagement from "./Profile";

const Sidebar = ({ onSelect, isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: "Clients", icon: <FaClipboardList />, key: "clients" },
    { name: "Documents", icon: <FaFileAlt />, key: "documents" },
    { name: "Case Results", icon: <FaClipboardList />, key: "results" },
    { name: "Profile Management", icon: <FaUser />, key: "profile" },
  ];

  const [active, setActive] = useState("clients");
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
        Lawyer Dashboard
        {username && <div className="text-lg mt-2">Welcome {username}</div>}
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

const LawyerDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("clients");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "profile":
        return <LawyerProfileManagement />;
      case "results":
        return <CaseDashboard />;
      case "documents":
        return <DocumentUpload />;
      case "clients":
        return <ClientRequests />;
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

export default LawyerDashboard;
