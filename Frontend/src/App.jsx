// import { useState } from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import "./App.css";
// import RegistrationForm from "./components/Registeration";
// import LoginForm from "./components/Login";
// import UserDashboard from "./Client/MainPage";
// import SupremeCourtLawyers from "./components/SupremeCourtLawyers";
// import HighCourtLawyers from "./components/HighCourtLawyers";
// import CivilLawyers from "./components/CivilLawyers";
// import CriminalLitigation from "./components/CriminalLitigationLawyers";
// import FamilyMatters from "./components/FamilyMatters";
// import LawyerDashboard from "./Lawyer/LawyerDashboard";
// import AdminDashboard from "./Admin/AdminDashboard";
// import { ToastContainer } from "react-toastify";
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <Router>

//         <Routes>
//           <Route path="/" element={<LoginForm />}></Route>
//           <Route path="/register" element={<RegistrationForm />}></Route>
//           //client Routes
//           <Route path="/client" element={<UserDashboard />}></Route>
//           <Route
//             path="/supreme-court-lawyers"
//             element={<SupremeCourtLawyers />}
//           ></Route>
//           <Route
//             path="/high-court-lawyers"
//             element={<HighCourtLawyers />}
//           ></Route>
//           <Route path="/civil-lawyers" element={<CivilLawyers />}></Route>
//           <Route
//             path="/criminal-litigation"
//             element={<CriminalLitigation />}
//           ></Route>
//           <Route path="/family-matters" element={<FamilyMatters />}></Route>
//         </Routes>
//         //Lawyer Routes
//         <Routes>
//           <Route path="/lawyer-dashboard" element={<LawyerDashboard />}></Route>
//         </Routes>
//         //admin Routes
//         <Routes>
//           <Route path="Admin-dashboard" element={<AdminDashboard />}></Route>
//         </Routes>
//       </Router>
//       <ToastContainer />
//     </>
//   );
// }

// export default App;

import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import RegistrationForm from "./components/Registeration";
import LoginForm from "./components/Login";
import UserDashboard from "./Client/MainPage";
import SupremeCourtLawyers from "./components/SupremeCourtLawyers";
import HighCourtLawyers from "./components/HighCourtLawyers";
import CivilLawyers from "./components/CivilLawyers";
import CriminalLitigation from "./components/CriminalLitigationLawyers";
import FamilyMatters from "./components/FamilyMatters";
import LawyerDashboard from "./Lawyer/LawyerDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import Unauthorized from "./components/Unauthorized"; // create this
import PrivateRoute from "./components/PrivateRoute"; // already created
import { ToastContainer } from "react-toastify";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Client Routes (user role) */}
          <Route
            path="/client"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/supreme-court-lawyers"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <SupremeCourtLawyers />
              </PrivateRoute>
            }
          />
          <Route
            path="/high-court-lawyers"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <HighCourtLawyers />
              </PrivateRoute>
            }
          />
          <Route
            path="/civil-lawyers"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <CivilLawyers />
              </PrivateRoute>
            }
          />
          <Route
            path="/criminal-litigation"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <CriminalLitigation />
              </PrivateRoute>
            }
          />
          <Route
            path="/family-matters"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <FamilyMatters />
              </PrivateRoute>
            }
          />

          {/* Lawyer Route */}
          <Route
            path="/lawyer-dashboard"
            element={
              <PrivateRoute allowedRoles={["lawyer"]}>
                <LawyerDashboard />
              </PrivateRoute>
            }
          />

          {/* Admin Route */}
          <Route
            path="/Admin-dashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
