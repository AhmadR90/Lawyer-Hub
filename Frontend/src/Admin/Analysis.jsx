// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const UserLawyerAnalysis = ({ userCount, lawyerCount }) => {
//   const data = [
//     { name: "Users", count: 7},
//     { name: "Lawyers", count: 2 },
//   ];

//   return (
//     <div className="p-6 bg-gray-700 min-h-screen flex flex-col gap-6 items-center">
//       {/* Summary Section */}
//       <div className="flex gap-6">
//         <div className="p-4 bg-blue-400 shadow-md rounded-lg text-center">
//           <h3 className="text-lg font-semibold">Registered Users</h3>
//           <p className="text-2xl font-bold text-blue-600">{userCount}</p>
//         </div>
//         <div className="p-4  shadow-md bg-red-400 rounded-lg text-center">
//           <h3 className="text-lg  font-semibold">Registered Lawyers</h3>
//           <p className="text-2xl font-bold text-green-600">{lawyerCount}</p>
//         </div>
//       </div>

//       {/* Bar Chart Section */}
//       <div className="bg-gray-900 shadow-md p-6 rounded-lg w-full max-w-md">
//         <h3 className="text-lg font-semibold text-white mb-4 text-center">Registration Analysis</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={data}>
//             <XAxis dataKey="name" className="text-gray-300" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="count" fill="#4F46E5" barSize={50} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default UserLawyerAnalysis;

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const UserLawyerAnalysis = () => {
  const [userData, setUserData] = useState({
    userCount: 0,
    lawyerCount: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/getAllUsers");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Count users by role
        let clients = 0;
        let lawyers = 0;
        
        data.forEach(user => {
          if (user.role === "client") {
            clients++;
          } else if (user.role === "lawyer") {
            lawyers++;
          }
          // Admins are not counted for the chart
        });
        
        setUserData({
          userCount: clients,
          lawyerCount: lawyers,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        setUserData({
          ...userData,
          loading: false,
          error: "Failed to fetch user data"
        });
      }
    };

    fetchUsers();
  }, []);

  const chartData = [
    { name: "Users", count: userData.userCount },
    { name: "Lawyers", count: userData.lawyerCount },
  ];

  if (userData.loading) {
    return (
      <div className="p-6 bg-gray-700 min-h-screen flex justify-center items-center">
        <p className="text-white text-xl">Loading user data...</p>
      </div>
    );
  }

  if (userData.error) {
    return (
      <div className="p-6 bg-gray-700 min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-xl">{userData.error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-700 min-h-screen flex flex-col gap-6 items-center">
      {/* Summary Section */}
      <div className="flex gap-6">
        <div className="p-4 bg-blue-400 shadow-md rounded-lg text-center">
          <h3 className="text-lg font-semibold">Registered Users</h3>
          <p className="text-2xl font-bold text-blue-600">{userData.userCount}</p>
        </div>
        <div className="p-4 shadow-md bg-red-400 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Registered Lawyers</h3>
          <p className="text-2xl font-bold text-green-600">{userData.lawyerCount}</p>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-gray-900 shadow-md p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Registration Analysis</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#f5f5f5" />
            <YAxis stroke="#f5f5f5" />
            <Tooltip />
            <Bar dataKey="count" fill="#4F46E5" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserLawyerAnalysis;