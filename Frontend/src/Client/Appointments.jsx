import { useState } from "react";

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  const ongoingAppointments = [
    { id: 1, lawyer: "John Doe", date: "2025-04-10", time: "10:00 AM", status: "Upcoming" },
    { id: 2, lawyer: "Sarah Smith", date: "2025-04-12", time: "2:00 PM", status: "Confirmed" },
  ];

  const previousAppointments = [
    { id: 3, lawyer: "Mark Johnson", date: "2025-03-20", time: "11:00 AM", status: "Completed" },
    { id: 4, lawyer: "Emma Davis", date: "2025-03-22", time: "3:30 PM", status: "Completed" },
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-700 p-6">
      <div className="w-full max-w-3xl bg-gray-950 border border-amber-500 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-amber-400 text-center mb-4">My Appointments</h2>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-4">
          <button
            className={`p-3 flex-1 text-center font-semibold ${
              activeTab === "ongoing" ? "text-amber-500 border-b-2 border-amber-500" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("ongoing")}
          >
            Ongoing
          </button>
          <button
            className={`p-3 flex-1 text-center font-semibold ${
              activeTab === "previous" ? "text-amber-500 border-b-2 border-amber-500" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("previous")}
          >
            Previous
          </button>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {(activeTab === "ongoing" ? ongoingAppointments : previousAppointments).map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 bg-gray-800 text-white border border-gray-700 rounded-lg flex flex-col md:flex-row items-start md:items-center gap-4"
            >
              <div className="flex-1">
                <strong>Lawyer: {appointment.lawyer}</strong>
                <p className="text-sm text-gray-400">Date: {appointment.date}</p>
                <p className="text-sm text-gray-400">Time: {appointment.time}</p>
              </div>
              <span className="px-3 py-1 text-sm font-semibold bg-amber-500 text-gray-900 rounded-lg">
                {appointment.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
