import React, { useState } from "react";

const LawyerRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: "John Doe", email: "johndoe@gmail.com", specialization: "Criminal Law", experience: "5 Years", status: "pending" },
    { id: 2, name: "Sarah Smith", email: "sarahsmith@gmail.com", specialization: "Corporate Law", experience: "3 Years", status: "pending" },
    { id: 3, name: "Michael Brown", email: "michaelbrown@gmail.com", specialization: "Family Law", experience: "7 Years", status: "pending" },
  ]);

  const handleAction = (id, action) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: action } : req));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700 px-4">
      <div className="w-full max-w-4xl bg-gray-900  shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Lawyer Registration Requests</h2>

        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-gray-600 p-4 rounded-lg shadow-md border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                  <p className="text-gray-200">📧 {request.email}</p>
                  <p className="text-gray-200">⚖️ Specialization: {request.specialization}</p>
                  <p className="text-gray-200">📅 Experience: {request.experience}</p>
                  <p className={`text-sm font-medium mt-2 ${request.status === "accepted" ? "text-green-600" : request.status === "rejected" ? "text-red-600" : "text-yellow-600"}`}>
                    Status: {request.status}
                  </p>
                </div>
                {request.status === "pending" && (
                  <div className="flex gap-2 mt-3 md:mt-0">
                    <button 
                      onClick={() => handleAction(request.id, "accepted")} 
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      ✅ Accept
                    </button>
                    <button 
                      onClick={() => handleAction(request.id, "rejected")} 
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      ❌ Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LawyerRequests;
